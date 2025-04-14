"use client";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

const Products = ({ data }) => {
 const router = useRouter();
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

 const handleCategoryChange = (e) => {
   const selectedCategory = e.target.value;
   setCategory(selectedCategory);
   setVisibleCount(10);
   router.push(
     `/products/category/${selectedCategory === "all" ? "" : selectedCategory}`
   );
 };

 useEffect(() => {
   if (router.pathname) {
     const pathCategory = router.pathname.split("/products/category/")[1];
     if (pathCategory) {
       setCategory(pathCategory);
     }
   }
 }, [router.pathname]);
  return (
    <div className="flex-col flex py-12 max-w-[1640px] mx-auto px-4">
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
          onChange={handleCategoryChange}
          value={category}
          className="appearance-none border-gray-500 border outline-none w-[180px] mx-auto my-4 p-3 rounded-lg relative bg-white"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 10 12 15 18 10'%3E%3C/polyline%3E%3C/svg%3E")`,
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
      <div className="flex flex-wrap w-full gap-6 justify-center pt-4">
        {displayData.length > 0 ? (
          displayData.map((product, i) => (
            <Link
              key={i}
              href={`/products/${product.id}`}
              className="max-w-[300px] w-full bg-white rounded-lg p-3 hover:shadow-xl duration-300 transition-all ease-linear"
            >
              <h2 className="text-2xl font-semibold">{product.title}</h2>
              <p className="mt-2 text-gray-700">{product.description}</p>
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
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {product.images.map((image, i) => (
                  <img
                    key={i}
                    className="max-w-32 w-full h-24 object-cover rounded-md"
                    src={image}
                    alt={`product image ${i + 1}`}
                  />
                ))}
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
            className="bg-blue-500 text-white py-3 transition-all text-xl font-semibold duration-300 ease-linear hover:bg-blue-700 px-6 rounded-lg"
          >
            Show More
          </button>
        )}
        {visibleCount > 10 && (
          <>
            <button
              onClick={() => setVisibleCount(visibleCount - 10)}
              className="bg-red-500 text-white py-3 transition-all text-xl font-semibold duration-300 ease-linear hover:bg-red-700 px-6 rounded-lg"
            >
              Show Less
            </button>
            <button
              onClick={() => setVisibleCount(10)}
              className="bg-green-500 text-white py-3 transition-all text-xl font-semibold duration-300 ease-linear px-6 rounded-lg hover:bg-green-700"
            >
              Set Default
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
