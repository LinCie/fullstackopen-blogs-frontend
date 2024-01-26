import { useState, useEffect } from "react";
import Blogs from "./components/blog/Blog";
import Layout from "./components/layouting/Layout";
import blogService from "./services/blogs";
import Login from "./components/Login";

import UserContext from "./contexts/UserContext";
import BlogsContext from "./contexts/BlogsContext";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = window.localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll(user);
        setBlogs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, [user]);

  return (
    <div className="bg-slate-50 font-mono">
      <UserContext.Provider value={{ user, setUser }}>
        <BlogsContext.Provider value={{ blogs, setBlogs }}>
          <Layout />
          {user ? <Blogs /> : <Login />}
        </BlogsContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
