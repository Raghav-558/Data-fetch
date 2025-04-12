import Details from "@/components/Details";
import React from "react";

async function getData(Id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${Id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const page = async ({ params }) => {
  const { Id } = params;
  const product = await getData(Id);

  return (
    <>
      <Details product={product} />
    </>
  );
};

export default page;
