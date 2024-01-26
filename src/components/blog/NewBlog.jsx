import { useState, useContext } from "react";

import { cn } from "../../lib/utils";

import UserContext from "../../contexts/UserContext";
import BlogsContext from "../../contexts/BlogsContext";

import blogService from "../../services/blogs";

const NewBlog = (props) => {
  const { setOpen } = props;

  const { user } = useContext(UserContext);
  const { blogs, setBlogs } = useContext(BlogsContext);

  const [blog, setBlog] = useState({ title: "", url: "", likes: 0 });

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await blogService.postNew(user, blog);
      if (response.data) {
        const newBlogs = [
          ...blogs,
          {
            ...response.data,
            author: user,
          },
        ];

        setBlogs(newBlogs);
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex flex-col">
        <label
          id="title-label"
          htmlFor="title"
          aria-label="title"
          className="mb-1 text-base font-medium"
        >
          Blog&apos;s Title
        </label>
        <input
          type="text"
          name="title"
          aria-labelledby="title-label"
          onChange={handleChange}
          value={blog.title}
          className="mb-2 w-full rounded-sm border-2 border-slate-300 px-2 py-1"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label
          id="url-label"
          htmlFor="url"
          aria-label="blog url"
          className="mb-1 text-base font-medium"
        >
          Blog&apos;s URL
        </label>
        <input
          type="url"
          name="url"
          aria-labelledby="url-label"
          onChange={handleChange}
          value={blog.url}
          className="mb-2 w-full rounded-sm border-2 border-slate-300 px-2 py-1"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label
          id="likes-label"
          htmlFor="likes"
          aria-label="blog likes"
          className="mb-1 text-base font-medium"
        >
          Blog&apos;s Likes
        </label>
        <input
          type="number"
          name="likes"
          aria-labelledby="likes-label"
          onChange={handleChange}
          value={blog.likes}
          className="mb-4 w-full rounded-sm border-2 border-slate-300 px-2 py-1"
        />
      </fieldset>
      <div className="flex justify-end">
        <button
          type="submit"
          className={cn(
            // Base styles
            "rounded-md border-2 border-slate-300 px-6 py-2 transition-all duration-75",
            // onHover
            "hover:bg-slate-100",
            // onActive
            "active:scale-95 active:bg-slate-300",
          )}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default NewBlog;
