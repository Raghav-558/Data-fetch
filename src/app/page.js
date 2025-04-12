import Products from "@/components/Products";

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

export default async function Page() {
  const products = await getData();
  return (
    <>
      <Products data={products} />
    </>
  );
}
