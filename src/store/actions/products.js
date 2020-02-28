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
  dispatch({ type: ActionTypes.UpdateProductByIdAttempt });
  ProductsResource.update(newProduct).then(res => {
    dispatch({ type: ActionTypes.UpdateProductByIdSuccess, payload: res.body.data });
  }).catch(err => {
    dispatch({ type: ActionTypes.UpdateProductByIdFailure, payload: null });
  });
};

export const deleteProductById = (id) => (dispatch) => {
  dispatch({ type: ActionTypes.DeleteProductByIdAttempt });
  ProductsResource.del(id).then(res => {
    dispatch({ type: ActionTypes.DeleteProductByIdSuccess, payload: id });
  }).catch(err => {
    dispatch({ type: ActionTypes.DeleteProductByIdFailure, payload: null });
  });
};




export const checkProduct = (index) => (dispatch) => {
  dispatch({ type: ActionTypes.CheckProduct, payload: index })
};