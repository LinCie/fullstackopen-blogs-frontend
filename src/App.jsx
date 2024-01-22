import { useState, useEffect } from "react";
import Blog from "./components/Blog";
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
    <div className="min-h-screen bg-slate-50 font-mono">
      <Layout user={user} handleUser={handleUser} />
      {user ? <Blog blogs={blogs} /> : <Login setUser={setUser} />}
    </div>
  );
};

export default App;
