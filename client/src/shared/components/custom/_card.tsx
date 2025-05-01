
import React from "react";
import { CardProps } from '../../types/types'; 

const CompsCard: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  actions,
  className,
}) => {
  return (
    <div
      className={`m-2 rounded-lg border shadow-lg overflow-hidden bg-white ${className}`}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-48"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && <p className="mt-2 text-gray-600">{description}</p>}
        {actions && <div className="mt-4">{actions}</div>}
      </div>
    </div>
  );
};

export default CompsCard;
