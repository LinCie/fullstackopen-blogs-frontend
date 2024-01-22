import { useState, useEffect } from "react";
import Blogs from "./components/Blog";
import Layout from "./components/Layout";
import blogService from "./services/blogs";
import Login from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll(user);
        console.log(response.data);
        setBlogs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, [user]);

  const handleUser = (user) => {
    setUser(user);
  };

  return (
    <div className="bg-slate-50 font-mono">
      <Layout user={user} handleUser={handleUser} />
      {user ? <Blogs blogs={blogs} user={user} /> : <Login setUser={setUser} />}
    </div>
  );
};

export default App;
