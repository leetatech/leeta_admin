import React from "react";
import { cn } from "../../utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    icon?: React.ReactNode;
    loading?: boolean;
    active?: boolean;
    bgColor?: string;
}

const Button: React.FC<ButtonProps> = ({ text, icon, loading, active, disabled, className,  bgColor = "bg-blue-600", 
    ...props }) => {
  return (
    <button
    className={cn(
      "flex justify-center items-center gap-2 px-1 py-1 rounded-md transition-all font-medium  border-[#E3E3E3] min-w-10",
      active ? bgColor : "bg-gray-400 cursor-not-allowed",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
    disabled={loading || disabled}
    {...props}
  >
    {loading ? "Loading..." : icon}
    {text && <span>{text}</span>}
  </button>
  );
};

export default Button;
