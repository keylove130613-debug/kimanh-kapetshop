import React, { useState } from "react";
import "../styles.css";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import BrandList from "../components/BrandList";
import BrandForm from "../components/BrandForm";
import OrderList from "../components/OrderList";

export default function Admin() {
  const [refresh, setRefresh] = useState(false);
  const [selectedTable, setSelectedTable] = useState("product");

  return (
    <div className="layout">
      <Sidebar selected={selectedTable} onSelect={setSelectedTable} />

      <div className="content">
        <h1>Trang Quản Trị</h1>

        {selectedTable === "product" && (
          <>
            <ProductForm onSave={() => setRefresh(!refresh)} />
            <ProductList key={`product-${refresh}`} />
          </>
        )}
        {selectedTable === "category" && (
          <>
            <CategoryForm onSave={() => setRefresh(!refresh)} />
            <CategoryList key={`category-${refresh}`} />
          </>
        )}
        {selectedTable === "brand" && (
          <>
            <BrandForm onSave={() => setRefresh(!refresh)} />
            <BrandList key={`brand-${refresh}`} />
          </>
        )}
        {selectedTable === "user" && (
          <>
            <UserForm onSave={() => setRefresh(!refresh)} />
            <UserList key={`user-${refresh}`} />
          </>
        )}

        {selectedTable === "order" && <OrderList />}
      </div>
    </div>
  );
}
