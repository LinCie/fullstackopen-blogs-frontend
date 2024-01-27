import { useState, useContext } from "react";

import * as Separator from "@radix-ui/react-separator";
import * as Dialog from "@radix-ui/react-dialog";

import { cn } from "../../lib/utils";

import UserContext from "../../contexts/UserContext";
import BlogsContext from "../../contexts/BlogsContext";

import NewBlog from "./NewBlog";
import DeleteBlogButton from "./DeleteBlogButton";

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

  const [open, setOpen] = useState(false);

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
        <div id="dashboard button" className="flex">
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="rounded-lg bg-green-400 p-2"
                aria-label="new blog"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
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
                <NewBlog setOpen={setOpen} />
                <Dialog.Close asChild>
                  <button className="absolute right-5 top-5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
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
