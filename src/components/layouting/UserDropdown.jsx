import { useState, useContext } from "react";

import * as Popover from "@radix-ui/react-popover";

import UserContext from "../../contexts/UserContext";

import { cn } from "../../lib/utils";

const UserDropdown = () => {
  const { user, setUser } = useContext(UserContext);

  const [isOpen, setisOpen] = useState(false);

  const handleClick = () => setisOpen(!isOpen);

  const handleLogOut = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    setisOpen(false);
  };

  return (
    <Popover.Root open={isOpen}>
      <Popover.Trigger asChild>
        <button onClick={handleClick} className="flex items-center gap-2">
          <div>
            {user
              ? // When the user is logged in
                `Logged in as ${user.username}`
              : // When the user is logged out
                "Currently not logged in"}
          </div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className={cn(
              // Base styles
              "rotate-0 transition-transform",
              // Open state
              {
                "rotate-[-180deg]": isOpen,
              },
              // User conditional
              user ? "block" : "hidden",
            )}
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={cn(
            // Base styles
            "flex w-36 flex-col border border-slate-300 bg-slate-50 px-4 py-2 font-mono",
            // Animations
            "will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideDownAndFade data-[state=open]:data-[side=left]:animate-slideLeftAndFade data-[state=open]:data-[side=right]:animate-slideRightAndFade data-[state=open]:data-[side=top]:animate-slideUpAndFade",
            // User conditional
            user ? "block" : "hidden",
          )}
          sideOffset={7}
        >
          <button onClick={handleLogOut}>Log Out</button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default UserDropdown;
