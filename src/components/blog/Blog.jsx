import { useState, useContext } from "react";

import * as Separator from "@radix-ui/react-separator";

import UserContext from "../../contexts/UserContext";
import BlogsContext from "../../contexts/BlogsContext";

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
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
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
