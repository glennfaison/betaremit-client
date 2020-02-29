import { ActionTypes } from "../../constants";
import { ProductsResource } from '../../httpResources';

export const fetchAllProducts = () => (dispatch) => {
  dispatch({ type: ActionTypes.FetchAllProductsAttempt });
  ProductsResource.all().then(res => {
    dispatch({ type: ActionTypes.FetchAllProductsSuccess, payload: res.body.data });
  }).catch(err => {
    dispatch({ type: ActionTypes.FetchAllProductsFailure, payload: null });
  });
};

export const fetchProductById = (id) => (dispatch) => {
  dispatch({ type: ActionTypes.FetchProductByIdAttempt });
  ProductsResource.get(id).then(res => {
    dispatch({ type: ActionTypes.FetchProductByIdSuccess, payload: res.body.data });
  }).catch(err => {
    dispatch({ type: ActionTypes.FetchProductByIdFailure, payload: null });
  });
};

export const createProduct = (product) => (dispatch) => {
  dispatch({ type: ActionTypes.CreateProductAttempt });
  ProductsResource.create(product).then(res => {
    dispatch({ type: ActionTypes.CreateProductSuccess, payload: res.body.data });
  }).catch(err => {
    dispatch({ type: ActionTypes.CreateProductFailure, payload: null });
  });
};

/**
 * Update a product using the `id` key of the product
 * @param {Product} newProduct must have an `id` key
 */
export const updateProductById = (newProduct) => (dispatch) => {
  let { rating, ...otherKeys } = newProduct;
  dispatch({ type: ActionTypes.UpdateProductByIdAttempt });

  // Add rating
  ProductsResource.addRating(otherKeys.id, rating).then(() => {
    // Update the other keys of th product
    ProductsResource.update(otherKeys).then(res => {
      dispatch({ type: ActionTypes.UpdateProductByIdSuccess, payload: res.body.data });
    }).catch(err => {
      dispatch({ type: ActionTypes.UpdateProductByIdFailure, payload: null });
    });
  });
};

export const deleteProductById = (...ids) => (dispatch) => {
  const deletionPromises = ids.map(id => ProductsResource.del(id));
  dispatch({ type: ActionTypes.DeleteProductByIdsAttempt });
  Promise.all(deletionPromises).then(res => {
    dispatch({ type: ActionTypes.DeleteProductByIdsSuccess, payload: ids });
  }).catch(err => {
    dispatch({ type: ActionTypes.DeleteProductByIdsFailure, payload: null });
  }).finally(() => dispatch({ type: ActionTypes.UncheckAllProducts }));
};




export const checkProduct = (...ids) => (dispatch) => {
  dispatch({ type: ActionTypes.CheckProduct, payload: ids })
};

export const uncheckAllProducts = () => (dispatch) => {
  dispatch({ type: ActionTypes.UncheckAllProducts })
};

export const checkAllProducts = () => (dispatch) => {
  dispatch({ type: ActionTypes.CheckAllProducts })
};

export const toggleCheckAllProducts = () => (dispatch) => {
  dispatch({ type: ActionTypes.ToggleCheckAllProducts })
};