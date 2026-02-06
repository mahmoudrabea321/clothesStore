import React, { useState } from "react";
import Products from "../component/products.jsx";
import CreateProduct from "../component/createProduct.jsx";
import { List, Plus } from "lucide-react"; 
const Dashboard = () => {
  const tabs = [
    { id: "products", label: "Products", icon: List },
    { id: "create-product", label: "Create Product", icon: Plus },
  ];

  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-amber-50">
        Admin Dashboard
      </h1>

      <div className="flex gap-6 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "border-b-2 border-black text-white"
                : "text-gray-300 hover:text-gray-600"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "products" && <Products />}
        {activeTab === "create-product" && <CreateProduct />}
      </div>
    </div>
  );
};

export default Dashboard;