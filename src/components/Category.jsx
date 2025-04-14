"use client";

import Link from "next/link";
import { useState } from "react";

const Category = ({ products, category }) => {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Products in {category[0].toUpperCase() + category.slice(1)} Category
      </h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 w-[180px] outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600">
          No products match your search.
        </p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center max-w-[1640px] mx-auto">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="max-w-[300px] w-full bg-white rounded-lg p-3 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <strong>Rating:</strong> {product.rating} ⭐
                </p>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
