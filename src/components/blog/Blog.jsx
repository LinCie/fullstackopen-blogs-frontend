// React imports
import { useContext } from "react";

// Radix imports
import * as Separator from "@radix-ui/react-separator";
import { PersonIcon } from "@radix-ui/react-icons";

// Context imports
import UserContext from "../../contexts/UserContext";
import BlogsContext from "../../contexts/BlogsContext";

// Component imports
import DeleteBlogButton from "./DeleteBlogButton";
import NewBlog from "./NewBlog";

const Blog = (props) => {
  const { blog } = props;

  return (
    <div className="flex w-full rounded-lg border-2 border-slate-300 px-8 py-4">
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-bold">{blog.title}</h2>
          <DeleteBlogButton blog={blog} />
        </div>
        <Separator.Root
          orientation="horizontal"
          className="my-2 h-px w-full bg-slate-500"
        />
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          <div className="flex items-center gap-1">
            <PersonIcon className="size-4" />
            {blog.author.username}
          </div>
          <Separator.Root
            className="h-full w-px bg-slate-500"
            orientation="vertical"
          />
          <div className="">Likes {blog.likes}</div>
          <Separator.Root
            className="h-full w-px bg-slate-500"
            orientation="vertical"
          />
          <a
            target="_blank"
            rel="noreferrer"
            href={blog.url}
            className="cursor-pointer hover:underline"
          >
            Visit Blog
          </a>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const { blogs } = useContext(BlogsContext);
  const { user } = useContext(UserContext);

  if (!blogs.length) return null;

  return (
    <section className="mt-16 p-8" id="blogs">
      <h1 className="mb-4 text-2xl font-bold">
        {user.username}&apos;s Dashboard
      </h1>
      <div className="mb-4 flex items-center justify-between">
        <p>
          You currently have {blogs?.length || 0}{" "}
          {blogs?.length > 1 ? "blogs" : "blog"}
        </p>
        <div id="dashboard-button" className="flex">
          <NewBlog />
        </div>
      </div>
      <Separator.Root
        className="mb-4 h-px w-full bg-slate-500"
        decorative
        orientation="horizontal"
      />
      <div className="flex flex-col gap-2 px-5">
        {blogs.map((blog) => (
          <Blog key={blog.title} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
