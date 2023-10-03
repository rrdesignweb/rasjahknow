

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  href?: string;
  className?: string;
  target?: string;
  onClick?: () => void;
  children: string | JSX.Element | JSX.Element[];
}

const Button = ({ href, className, target = "_self", type, onClick, children }: ButtonProps) => {

  const handleOnClick = () => {
    if(onClick) onClick();
  }

  return (
    <>
      {
        href ? (
          <a
            target={target}
            href={href}
            className={`cursor-pointer appearance-none py-2 my-4 px-4 border-2 uppercase  font-semibold shadow-md hover:bg-red-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 ${className ? className : "bg-transparent text-white"
              }`}
          >
            {children}
          </a>
        ) : (
          <button
            type={type}
            onClick={handleOnClick}
            data-button
            className={`cursor-pointer appearance-none py-2 my-4 px-4 bg-transparent border-2 uppercase text-white font-semibold shadow-md hover:bg-red-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 ${className}`}
          >
            {children}
          </button>
        )
      }
    </>
  )
}

export default Button;


