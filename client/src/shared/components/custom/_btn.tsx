import React from "react";
import { Button } from "../ui/button";
import { BtnCustomType } from "../../types/types"; 

const CompsButton: React.FC<BtnCustomType> = ({
  children,
  onClick,
  type = "button", 
  className = "",
  loading = false,
  disabled = false,
  error = false 
}) => {
  return (
    <div className="m-2" role="button">
      <Button
        onClick={onClick}
        type={type}
        className={`${className} ${!error ? 'shad_Btn': 'bg-red-700'} text-lg mt-1 tracking-wider h-12 flex items-center justify-center rounded-xl ${
          loading || disabled
            ? "opacity-50 cursor-not-allowed"
            : error
            ? "hover:bg-red-500"
            : "hover:bg-80-hover"
        }`}
        disabled={disabled || loading}
      >
        {loading ? (
          <span className="w-5 h-5 mr-2 border-t-2 border-white rounded-full animate-spin"></span>
        ) : (
          children
        )}
      </Button>
    </div>
  );
};

export default CompsButton;
