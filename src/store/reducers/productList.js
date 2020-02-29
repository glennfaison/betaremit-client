import { ActionTypes } from "../../constants";

const DefaultState = {
  waiting: false,
  data: []
};

const productList = (state = DefaultState, action) => {
  const type = action.type || undefined;
  let lst = [...state.data];
  switch (type) {
    case ActionTypes.FetchAllProductsAttempt:
      return { waiting: true, data: [...state.data] };

    case ActionTypes.FetchAllProductsSuccess:
      const products = action.payload;
      return { waiting: false, data: [...products] };

    case ActionTypes.FetchAllProductsFailure:
      return { waiting: false, data: [] };



    case ActionTypes.CreateProductAttempt:
      return { waiting: true, data: [...state.data] };

    case ActionTypes.CreateProductSuccess:
      const newProduct = action.payload;
      return { waiting: false, data: [...state.data, newProduct] };

    case ActionTypes.CreateProductFailure:
      return { waiting: false, data: [...state.data] };



    case ActionTypes.UpdateProductByIdAttempt:
      return { waiting: true, data: [...state.data] };

    case ActionTypes.UpdateProductByIdSuccess:
      const updatedProduct = action.payload;
      const updateIndex = state.data.findIndex(i => i.id === updatedProduct.id);
      lst.splice(updateIndex, 1, updatedProduct);
      return { waiting: false, data: [...lst] };

    case ActionTypes.UpdateProductByIdFailure:
      return { waiting: false, data: [...state.data] };



    case ActionTypes.DeleteProductByIdsAttempt:
      return { waiting: true, data: [...state.data] };

    case ActionTypes.DeleteProductByIdsSuccess:
      let ids = action.payload;
      lst = state.data.filter(prod => !ids.includes(prod.id))
      return { waiting: false, data: [...lst] };

    case ActionTypes.DeleteProductByIdsFailure:
      return { waiting: false, data: [...state.data] };



    case ActionTypes.CheckProduct:
      lst = [...state.data];
      lst.forEach((prod, i) => {
        if (action.payload.includes(prod.id)) {
          lst[i].isChecked = !lst[i].isChecked;
        }
      })
      return { waiting: false, data: lst };

    case ActionTypes.UncheckAllProducts:
      lst = [...state.data];
      lst.forEach((prod, i) => ({ ...prod, isChecked: false }))
      return { waiting: false, data: lst };

    case ActionTypes.CheckAllProducts:
      lst = [...state.data];
      lst.forEach((prod, i) => ({ ...prod, isChecked: true }))
      return { waiting: false, data: lst };

    case ActionTypes.ToggleCheckAllProducts:
      lst = [...state.data];
      // Uncheck all if ANY is checked, and check all otherwise
      const toggleValue = !lst.some(prod => prod.isChecked);
      lst.forEach((prod, i) => ({ ...prod, isChecked: toggleValue }))
      return { waiting: false, data: lst };



    default:
      return state;
  }
};

export default productList;
