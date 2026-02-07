import React from "react";
import CategoryItem from "../component/categoryItem.jsx";

const HomePage = () => {
  const categories = [
    { href: "jackets", name: "Jackets", imgUrl: "jackets.jpg" },
    { href: "shoes", name: "Shoes", imgUrl: "shoes.jpg" },
    { href: "tshirts", name: "T-Shirts", imgUrl: "tshirts.jpg" },
    { href: "pants", name: "Pants", imgUrl: "pants.jpg" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-center text-zinc-100">
        Shop by Category
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.href}
            className="group relative h-72 overflow-hidden rounded-xl cursor-pointer border"
          >
            <CategoryItem category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;