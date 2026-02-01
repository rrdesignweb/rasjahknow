import { useEffect, useState } from 'react';

const Newsletter = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        'https://assets.mailerlite.com/jsonp/2079304/forms/178167323132168055/subscribe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            'fields[email]': email,
            'ml-submit': '1',
            'anticsrf': 'true',
          }),
          mode: 'no-cors', // MailerLite doesn't support CORS
        }
      );
      
      // Since mode is no-cors, we can't read the response
      // Assume success if no error thrown
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  if (isSuccess) {
    return (
      <section className="text-white">
        <div className="mx-auto max-w-screen-xl px-2 md:px-16">
          <div className="mx-auto max-w-screen-md text-center mt-10 md:m-0">
            <h3 className="mb-4 text-xl md:text-2xl tracking-tight font-semibold uppercase text-white">
              Thank you!
            </h3>
            <p className="mx-auto max-w-2xl font-light text-white sm:text-xl">
              You have successfully joined our subscriber list.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-white">
      <div className="mx-auto max-w-screen-xl px-2 md:px-16">
        <div className="mx-auto max-w-screen-md text-center mt-10 md:m-0">
          <h3 className="mb-4 text-xl md:text-2xl tracking-tight font-semibold uppercase text-white">
            Join our mailing list
          </h3>
          <p className="mx-auto mb-8 max-w-2xl font-light text-white md:mb-12 sm:text-xl">
            Sign up with your email address to receive news and updates.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="items-center justify-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
              <div className="relative w-full md:w-96">
                <label
                  htmlFor="email"
                  className="hidden mb-2 text-sm font-semibold text-gray-300"
                >
                  Email address
                </label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  className="block p-3 pl-10 w-full md:w-96 text-md text-white bg-transparent border-2 border-white placeholder-gray-400 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer appearance-none py-2 my-4 px-4 bg-transparent border-2 uppercase text-white font-semibold shadow-md hover:bg-red-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 w-60 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  'Sign up to enews'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;