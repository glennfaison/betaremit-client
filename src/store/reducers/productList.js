import { ActionTypes } from "../../constants";

const DefaultState = {
  waiting: false,
  data: []
};

const productList = (state = DefaultState, action) => {
  const type = action.type || undefined;
  const lst = [...state.data];
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



    case ActionTypes.DeleteProductByIdAttempt:
      return { waiting: true, data: [...state.data] };

    case ActionTypes.DeleteProductByIdSuccess:
      let id = action.payload;
      const deleteIndex = state.data.findIndex(i => i.id === id);
      lst.splice(deleteIndex, 1);
      return { waiting: false, data: [...lst] };

    case ActionTypes.DeleteProductByIdFailure:
      return { waiting: false, data: [...state.data] };



    case ActionTypes.CheckProduct:
      const toggledProduct = { ...state.data[action.payload] };
      toggledProduct.isChecked = !toggledProduct.isChecked;
      lst.splice(action.payload, 1, toggledProduct);
      return { waiting: false, data: [...lst] };



    default:
      return state;
  }
};

export default productList;
