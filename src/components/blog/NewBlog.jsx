// React imports
import { useState, useContext } from "react";

// Radix imports
import * as Dialog from "@radix-ui/react-dialog";
import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons";

// Utility imports
import { cn } from "../../lib/utils";

// Context imports
import UserContext from "../../contexts/UserContext";
import BlogsContext from "../../contexts/BlogsContext";

// Service imports
import blogService from "../../services/blogs";

const NewBlogForm = (props) => {
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
            "rounded-md border border-blue-300 bg-blue-200 px-4 py-1 text-lg text-blue-700/90 transition duration-150 ease-in-out",
            // Hover styles
            "hover:opacity-70",
            // Action styles
            "active:scale-90 active:opacity-50",
          )}
        >
          Add
        </button>
      </div>
    </form>
  );
};

const NewBlog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            // Base styles
            "rounded-md bg-green-600 p-1 text-white transition duration-150 ease-in-out",
            // Hover state
            "hover:opacity-70",
            // Active state
            "active:scale-90 active:opacity-50",
          )}
          aria-label="new blog"
        >
          <PlusIcon className="size-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          // eslint-disable-next-line tailwindcss/classnames-order
          className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow"
        />
        <Dialog.Content
          className={cn(
            // Base styles
            "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-lg bg-slate-50 p-6 font-mono",
            // Open state styles
            "data-[state=open]:animate-contentShow",
          )}
        >
          <Dialog.Title className="mb-1 text-xl font-medium">
            New Blog
          </Dialog.Title>
          <Dialog.Description className="mb-3 text-base text-black/60">
            Add a new blog into your database
          </Dialog.Description>
          <NewBlogForm setOpen={setOpen} />
          <Dialog.Close asChild>
            <button className="absolute right-5 top-5">
              <Cross1Icon className="size-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewBlog;
