import { HttpResource } from "./HttpResource";

export const ProductsResource = {
  all: () =>
    HttpResource.get(`/api/v1/products`),
  del: id =>
    HttpResource.del(`/api/v1/products/${id}`),
  get: id =>
    HttpResource.get(`/api/v1/products/${id}`),
  update: (newProduct) =>
    HttpResource.put(`/api/v1/products/${newProduct.id}`, { product: newProduct }),
  addRating: (productId, rating) =>
    HttpResource.put(`/api/v1/products/${productId}/rating`, { rating: rating }),
  create: product =>
    HttpResource.post('/api/v1/products', { product: product }),
};
