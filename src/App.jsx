import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Layout from "./components/Layout";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleUser = (user) => {
    setUser(user);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Layout user={user} handleUser={handleUser} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
