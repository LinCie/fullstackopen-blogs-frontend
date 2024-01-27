// React imports
import { useContext } from "react";

// Radix Primitive imports
import * as AlertDialog from "@radix-ui/react-alert-dialog";

// Radix Icon imports
import { TrashIcon } from "@radix-ui/react-icons";

// Utility imports
import { cn } from "../../lib/utils";

// Context imports
import UserContext from "../../contexts/UserContext";
import BlogsContext from "../../contexts/BlogsContext";

// Services imports
import blogsService from "../../services/blogs";

const DeleteBlogButton = (props) => {
  const { blog } = props;
  const { blogs, setBlogs } = useContext(BlogsContext);
  const { user } = useContext(UserContext);

  // Handle click function for deleting a blog
  const handleClick = async () => {
    try {
      // Calling deleteBlog function from blogsService
      const response = await blogsService.deleteBlog(user, blog);

      // If response status is 204, filter out the deleted blog from the blogs state
      if (response.status === 204) {
        setBlogs(blogs.filter((filteredBlog) => filteredBlog.id !== blog.id));
      }
    } catch (err) {
      // Log any errors
      console.log(err);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          className={cn(
            // Base styles
            "rounded-md bg-red-600 p-1 text-white transition duration-150 ease-in-out",
            // Hover state
            "hover:opacity-70",
            // Active state
            "active:scale-90 active:opacity-50",
          )}
        >
          <TrashIcon className="size-5" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          // eslint-disable-next-line tailwindcss/classnames-order
          className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow"
        />
        <AlertDialog.Content
          className={cn(
            // Base styles
            "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-lg bg-slate-50 p-6 font-mono",
            // Open state styles
            "data-[state=open]:animate-contentShow",
          )}
        >
          <AlertDialog.Title className="mb-2 text-lg font-bold">
            Are you sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-4 text-base leading-tight text-black/60">
            This action can&apos;t be undone. This will permanently delete your
            blog from the database.
          </AlertDialog.Description>
          <div
            id="alert-dialog-button-container"
            className="flex items-center justify-end gap-4"
          >
            <AlertDialog.Cancel
              className={cn(
                // Base styles
                "rounded-md border border-slate-300 bg-slate-200 px-4 py-1 text-lg text-slate-700/90 transition duration-150 ease-in-out",
                // Hover styles
                "hover:opacity-70",
                // Action styles
                "active:scale-90 active:opacity-50",
              )}
            >
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={handleClick}
                className={cn(
                  // Base styles
                  "rounded-md border border-red-300 bg-red-200 px-4 py-1 text-lg text-red-700/90 transition duration-150 ease-in-out",
                  // Hover styles
                  "hover:opacity-70",
                  // Action styles
                  "active:scale-90 active:opacity-50",
                )}
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteBlogButton;
