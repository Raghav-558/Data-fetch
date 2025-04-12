"use client";
import Link from "next/link";
import { useState } from "react";

const Products = ({ data }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredData = data.filter((product) => {
    const matchTitle = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      category === "all" || product.category.toLowerCase() === category;
    return matchTitle && matchCategory;
  });

  const displayData = filteredData.slice(0, visibleCount);

  return (
    <div className="flex-col flex py-12 max-w-[1640px] mx-auto">
      <h1 className="text-4xl text-center font-bold py-3">Product List</h1>

      <div className="flex items-center mx-auto gap-4 flex-wrap justify-center">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(10); 
          }}
          type="text"
          placeholder="Search..."
          className="border-gray-500 border outline-none my-4 p-3 rounded-lg"
        />

        <select
          onChange={(e) => setCategory(e.target.value)}
          className="appearance-none border-gray-500 border outline-none w-[180px] mx-auto my-4 p-3 rounded-lg relative bg-white"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundColor: "transparent",
            backgroundSize: "1rem",
          }}
        >
          <option value="all">All</option>
          <option value="furniture">Furniture</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>

      <div className="flex flex-col pt-3">
        <div className="flex gap-4 flex-wrap justify-center">
          {displayData.length > 0 ? (
            displayData.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="w-[300px] border border-gray-500 p-4 rounded-lg hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <h2 className="font-semibold text-lg mb-2">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-700 mb-2">
                    {product.description}
                  </p>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    width={250}
                    height={250}
                    className="rounded pointer-events-none"
                  />
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No products match your search.
            </p>
          )}
        </div>

        <div className="mx-auto text-center mt-6 space-x-4">
          {visibleCount < filteredData.length && (
            <button
              onClick={() => setVisibleCount(visibleCount + 10)}
              className="bg-blue-500 text-white py-3 transition-all duration-300 ease-linear hover:bg-blue-700 px-5 rounded-lg"
            >
              Show More
            </button>
          )}

          {visibleCount > 10 && (
            <>
              <button
                onClick={() => setVisibleCount(visibleCount - 10)}
                className="bg-red-500 text-white py-3 transition-all duration-300 ease-linear hover:bg-red-700 px-5 rounded-lg"
              >
                Show Less
              </button>
              <button
                onClick={() => setVisibleCount(10)}
                className="bg-green-500 text-white py-3 transition-all duration-300 ease-linear px-5 rounded-lg hover:bg-green-700"
              >
                Set Default
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
