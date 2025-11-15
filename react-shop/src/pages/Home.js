import React, { useState } from "react";
import "../styles.css";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
import BrandList from "../components/BrandList";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";

export default function Home() {
  const [selectedTable, setSelectedTable] = useState("product");
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="layout">
      <Sidebar selected={selectedTable} onSelect={setSelectedTable} />

      <div className="content">
        <h1>Trang chủ</h1>

        {selectedTable === "product" && <ProductList key={`product-${refresh}`} />}
        {selectedTable === "category" && <CategoryList key={`category-${refresh}`} />}
        {selectedTable === "brand" && <BrandList key={`brand-${refresh}`} />}
        {selectedTable === "user" && (
          <>
            <UserForm onSave={() => setRefresh(!refresh)} />
            <UserList key={`user-${refresh}`} />
          </>
        )}
      </div>
    </div>
  );
}
