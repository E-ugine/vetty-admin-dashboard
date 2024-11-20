import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const EditProduct = () => {
  const { productId } = useParams(); // Correct parameter name
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(setProduct)
      .catch((error) => {
        console.error("Error fetching product:", error);
        alert("Product not found or an error occurred while fetching the product.");
      });
  }, [productId]);

  const handleInputChange = (field, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const handleSave = () => {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update product");
        }
        alert("Product updated successfully!");
        navigate("/catalog/product/manage");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("An error occurred. Please try again.");
      });
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="edit-product">
      <h1>Edit Product #{productId}</h1>
      <Input
        label="Product Name"
        value={product.name}
        onChange={(value) => handleInputChange("name", value)}
      />
      <Input
        label="Price"
        value={product.price}
        onChange={(value) => handleInputChange("price", value)}
      />
      <Input
        label="Currency"
        value={product.currency}
        onChange={(value) => handleInputChange("currency", value)}
      />
      <Input
        label="Image URL"
        value={product.imageSrc}
        onChange={(value) => handleInputChange("imageSrc", value)}
      />
      <Button label="Save Changes" onClick={handleSave} />
      <Button label="Cancel" onClick={() => navigate("/catalog/product/manage")} />
    </div>
  );
};

export default EditProduct;
