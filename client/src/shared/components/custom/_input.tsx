import React from 'react';
import { Input } from "../ui/input";
import { InputProps } from '../../types/types'; 

const CompsInputField: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  label,
  type = 'text', // Default input type is text
  error,
  className = '',
  disabled = false
}) => {
  return (
    <div className={`mx-2 mb-4 ${className}`}>
      {label && <label className="block mb-2 text-sm font-medium">{label}</label>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`text-lg shad_input w-full ${error ? 'border-red-500' : ''}`}
      />
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default CompsInputField;
