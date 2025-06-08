import Show from "../show";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  onProcess?: React.ReactNode;
}

const Button = ({ className, children, isLoading, onProcess, disabled, ...props }: ButtonProps) => {

  return (
    <button
      {...props}
      className={`w-full rounded-lg px-6 py-3 font-bold text-black border-2 border-black shadow-[3px_3px_0px_black] transition-all 
        ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none"} `}
    >
      <Show when={!isLoading} fallback={onProcess}>
        {children}
      </Show>
    </button>
  );
};

export default Button;
