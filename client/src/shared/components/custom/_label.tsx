import { Label } from "../ui/label";
import React from "react";
import { LabelPropType } from '../../types/types';

const CompsLabel: React.FC<LabelPropType> = ({
  children,
  labelFor,
  className = "",
  required = false,
  error = false,
}) => {
  return (
    <div className="m-2">
      <Label
        className={`${className} ${error ? "text-red-500" : ""}`} // Add error state styles
        htmlFor={labelFor}
      >
        {children}
        {required && <span className="ml-1 text-red-600">*</span>} {/* Shows asterisk for required fields */}
      </Label>
    </div>
  );
};

export default CompsLabel;
