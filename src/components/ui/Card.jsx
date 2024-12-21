import React from 'react';

const Card = ({
  children,
  title,
  description,
  className = '',
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-white',
    green: 'bg-green-50',
    blue: 'bg-blue-50'
  };

  return (
    <div 
      className={`rounded-lg shadow-md p-6 ${variants[variant]} ${className}`}
      {...props}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
};

export default Card;