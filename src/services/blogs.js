import { api } from "./axios";

const getAll = (user) => {
  const authorization = `Bearer ${user.authorization}`;
  return api.get("/blogs", { headers: { Authorization: authorization } });
};

export default { getAll };
