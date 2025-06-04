import { useEffect, useState } from 'react';
import Button from "./Button";

const Newsletter = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignUp = () => {
    alert("Newsletter sign up coming soon...")
  }

  if (!isMounted) {
    return null;
  }

  return (
    <section className="text-white">
      <div className="mx-auto max-w-screen-xl px-2 md:px-16">
        <div className="mx-auto max-w-screen-md text-center mt-10 md:m-0">
          <h3
            className="mb-4 text-xl md:text-2xl tracking-tight font-semibold uppercase text-white"
          >
            Join our mailing list
          </h3>
          <p
            className="mx-auto mb-8 max-w-2xl font-light text-white md:mb-12 sm:text-xl"
          >
            Sign up with your email address to receive news and updates.
          </p>
          <form action="#">
            <div
              className="items-center justify-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0"
            >
              <div className="relative w-full md:w-96">
                <label
                  htmlFor="email"
                  className="hidden mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
                >Email address</label>
                <div
                  className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    className="w-5 h-5 text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  ><path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  ></path><path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  ></path></svg>
                </div>
                <input
                  className="block p-3 pl-10 w-full md:w-96 text-md text-gray-900  border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  required
                />
              </div>
            </div>

            <div>
              <Button type="button" className="w-60" onClick={handleSignUp}>Sign up to enews</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
};

export default Newsletter;