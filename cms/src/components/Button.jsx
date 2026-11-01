const variants = {
  primary: "bg-gray-700 text-white hover:bg-black",
  danger: "bg-red-400 text-black hover:bg-red-500",
  success: "bg-green-400 text-black hover:bg-green-500",
  info: "bg-blue-400 text-black hover:bg-blue-500",
};

export default function Button({
  nameProp,
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`py-2 px-4 border-2 border-black rounded-lg text-sm font-medium shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer disabled:opacity-40 ${variants[variant]} ${className}`}
      >
        {nameProp || children}
      </button>
    </>
  );
}
