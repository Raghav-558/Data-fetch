import React from "react";

const Details = ({ product }) => {
  if (!product || product.length === 0) {
    return (
      <div className="text-center text-gray-500 font-medium">
        No details available.
      </div>
    );
  }

    return (
      <div className="py-12 min-h-screen flex items-center justify-center">
            <div className="max-w-[350px] mx-auto p-5 bg-white shadow rounded-lg cursor-pointer">
                <img src={product.thumbnail} alt="produnt-image" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {product.title}
          </h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex justify-between gap-4 items-center text-lg font-medium text-gray-800">
            <span>Price:</span>
            <span>${product.price}</span>
          </div>
        </div>
      </div>
    );
};

export default Details;
