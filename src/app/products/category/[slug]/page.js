import Category from "@/components/Category";
import React from "react";

async function getData() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const page = async ({ params }) => {
  const products = await getData();
  const category = params.slug || "all";

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => {
          return (
            product.category &&
            product.category.toLowerCase() === category.toLowerCase()
          );
        });
  return <Category products={filteredProducts} category={category} />;
};
export default page;
