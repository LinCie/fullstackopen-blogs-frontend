import { api } from "./axios";

const getAll = (user) => {
  const authorization = `Bearer ${user.token}`;
  return api.get("/blogs", { headers: { Authorization: authorization } });
};

const postNew = (user, blog) => {
  const authorization = `Bearer ${user.token}`;
  return api.post("/blogs", blog, {
    headers: { Authorization: authorization },
  });
};

export default { getAll, postNew };
