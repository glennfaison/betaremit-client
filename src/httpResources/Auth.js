import { HttpResource } from "./HttpResource";

export const AuthResource = {
  logIn: (user) =>
    HttpResource.put('/api/v1/auth/login', user),

  register: (user) =>
    HttpResource.post('/api/v1/auth/register', user),

  me: () => HttpResource.get('/api/v1/auth/me'),
};
