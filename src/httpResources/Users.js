import { HttpResource } from "./HttpResource";

export const UsersResource = {
  all: () =>
    HttpResource.get(`/api/v1/users`),
  del: id =>
    HttpResource.del(`/api/v1/users/${id}`),
  get: id =>
    HttpResource.get(`/api/v1/users/${id}`),
  update: (newUser) =>
    HttpResource.put(`/api/v1/users/${newUser.id}`, { user: newUser }),
};
