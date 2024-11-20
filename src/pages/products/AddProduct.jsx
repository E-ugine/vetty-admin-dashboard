import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import Input from "../../components/common/Input.jsx";
import Textarea from "../../components/common/Textarea.jsx";
import Button from "../../components/common/Button.jsx";

const AddProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    imageSrc: "",
    title: "",
    price: "",
    stars: "",
    rates: "",
    discount: "",
    state: "",
    quantity: "",
    type: "",
    details: "",
  });

  const handleInputChange = (key, value) => {
    setProduct((prevProduct) => ({ ...prevProduct, [key]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Ensure required fields are filled
    if (!product.id || !product.title || !product.price) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({
          id: "",
          imageSrc: "",
          title: "",
          price: "",
          stars: "",
          rates: "",
          discount: "",
          state: "",
          quantity: "",
          type: "",
          details: "",
        });
      } else {
        alert("Failed to add the product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <div className="content">
            <h2 className="sub_heading">Add Product</h2>
            <Input
              type="text"
              placeholder="Enter Product ID"
              label="ID"
              value={product.id}
              onChange={(value) => handleInputChange("id", value)}
            />
            <Input
              type="text"
              placeholder="Enter Image URL"
              label="Image URL"
              value={product.imageSrc}
              onChange={(value) => handleInputChange("imageSrc", value)}
            />
            <Input
              type="text"
              placeholder="Enter Title"
              label="Title"
              value={product.title}
              onChange={(value) => handleInputChange("title", value)}
            />
            <Input
              type="number"
              placeholder="Enter Price"
              label="Price"
              value={product.price}
              onChange={(value) => handleInputChange("price", value)}
            />
            <Input
              type="number"
              placeholder="Enter Stars (1-5)"
              label="Stars"
              value={product.stars}
              onChange={(value) => handleInputChange("stars", value)}
            />
            <Input
              type="number"
              placeholder="Enter Number of Rates"
              label="Rates"
              value={product.rates}
              onChange={(value) => handleInputChange("rates", value)}
            />
            <Input
              type="number"
              placeholder="Enter Discount Percentage"
              label="Discount"
              value={product.discount}
              onChange={(value) => handleInputChange("discount", value)}
            />
            <Input
              type="number"
              placeholder="Enter State (1 or 0)"
              label="State"
              value={product.state}
              onChange={(value) => handleInputChange("state", value)}
            />
            <Input
              type="number"
              placeholder="Enter Quantity"
              label="Quantity"
              value={product.quantity}
              onChange={(value) => handleInputChange("quantity", value)}
            />
            <Input
              type="text"
              placeholder="Enter Type"
              label="Type"
              value={product.type}
              onChange={(value) => handleInputChange("type", value)}
            />
            <Textarea
              placeholder="Enter Details"
              label="Details"
              value={product.details}
              onChange={(value) => handleInputChange("details", value)}
            />
            <Button
              type="submit"
              label="Save Product"
              icon={<Icons.TbCircleCheck />}
              className="success"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
