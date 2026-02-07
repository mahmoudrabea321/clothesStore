import React, { useState } from "react";
import useProductStore from "../lib/useProductStore";
import { toast } from "react-hot-toast";

const CreateProduct = () => {
  const createProduct = useProductStore((state) => state.createProduct);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "jackets",
    isFeatured: false,
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Image is required");

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onloadend = () => {
      createProduct({
        ...form,
        price: Number(form.price),
        image: reader.result,
      });
    };
    alert("Product created successfully");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Product
        </h2>

        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="category"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="jackets">Jackets</option>
          <option value="shoes">Shoes</option>
          <option value="tshirts">T-Shirts</option>
          
        </select>

        <label className="flex items-center gap-3 text-white mb-4">
          <input
            type="checkbox"
            name="isFeatured"
            onChange={handleChange}
            className="w-5 h-5 accent-blue-600"
          />
          Featured Product
        </label>

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full mb-6 text-white file:bg-blue-600 file:border-0 file:px-4 file:py-2 file:rounded file:text-white file:cursor-pointer"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;