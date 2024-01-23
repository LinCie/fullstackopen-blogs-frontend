import { useState } from "react";

import { cn } from "../lib/utils";
import { api } from "../services/axios";

const Login = (props) => {
  const { setUser } = props;

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    try {
      const user = await api.post("/users/login", formData);
      if (user.data) {
        window.localStorage.setItem(
          "user",
          JSON.stringify(user.data.authorization),
        );
        setUser(user.data.authorization);
      }
    } catch (err) {
      if (err.response.status === 401) setIsError(true);
    }
  };

  return (
    <section
      id="login"
      className="flex min-h-screen items-center justify-center"
      onSubmit={handleSubmit}
    >
      <form className="rounded-lg border-2 border-slate-400 bg-white p-5">
        <div id="login-header">
          <h1 className="mb-4 text-2xl font-medium">Login</h1>
        </div>
        <div id="username-input" className="flex flex-col">
          <label
            id="username-label"
            aria-label="username"
            htmlFor="username"
            className="mb-1"
          >
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            aria-labelledby="username-label"
            placeholder="johndoe"
            aria-placeholder="johndoe"
            className={cn(
              // Base styles
              "mb-2 w-[75vw] rounded-sm border-2 border-slate-300 px-2 py-1 sm:w-[50vw] md:w-[25vw]",
              // Error styles
              { "border-red-600": isError },
            )}
          />
        </div>
        <div id="password-input" className="flex flex-col">
          <label
            id="password-label"
            aria-label="password"
            htmlFor="password"
            className="mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            aria-labelledby="password-label"
            className={cn(
              // Base styles
              "mb-6 w-[75vw] rounded-sm border-2 border-slate-300 px-2 py-1 sm:w-[50vw] md:w-[25vw]",
              // Error styles
              { "border-red-600": isError },
            )}
          />
        </div>
        <div
          id="login-footer"
          className="flex w-[75vw] items-center justify-between sm:w-[50vw] md:w-[25vw]"
        >
          {isError ? (
            <div className="mb-2 flex w-[75vw] items-center justify-end gap-2 text-red-600 sm:w-[50vw] md:w-[25vw]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              Invalid username and/or password!
            </div>
          ) : (
            <div></div>
          )}
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
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
