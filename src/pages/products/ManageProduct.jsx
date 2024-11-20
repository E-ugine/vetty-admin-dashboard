import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Offcanvas from "../../components/common/Offcanvas.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import TableAction from "../../components/common/TableAction.jsx";
import RangeSlider from "../../components/common/RangeSlider.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [fields, setFields] = useState({
    name: "",
    store: "",
    status: "",
    priceRange: [0, 100],
  });
  const [bulkCheck, setBulkCheck] = useState(false);
  const [specificChecks, setSpecificChecks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://vetty-backend-s1mr.onrender.com/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const handleInputChange = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleBulkCheckbox = (isCheck) => {
    setBulkCheck(isCheck);
    setSpecificChecks(
      isCheck
        ? Object.fromEntries(products.map((product) => [product.id, true]))
        : {}
    );
  };

  const handleCheckProduct = (isCheck, id) => {
    setSpecificChecks((prev) => ({
      ...prev,
      [id]: isCheck,
    }));
  };

  const handleSliderChange = (newValues) => {
    setFields((prev) => ({ ...prev, priceRange: newValues }));
  };

  const handleActionItemClick = async (item, itemID) => {
    if (item.toLowerCase() === "delete") {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (confirmDelete) {
        try {
          const response = await fetch(`https://vetty-backend-s1mr.onrender.comproducts/${itemID}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete the product.");
          }

          // Remove the deleted product from the state
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== itemID));

          alert(`Product #${itemID} has been successfully deleted.`);
        } catch (error) {
          console.error("Error deleting product:", error);
          alert("An error occurred while deleting the product. Please try again.");
        }
      }
    } else if (item.toLowerCase() === "edit") {
      navigate(`/catalog/product/manage/${itemID}`);
    }
  };

  const stores = [
    { label: "FashionFiesta" },
    { label: "TechTreasures" },
    { label: "GadgetGrove" },
  ];

  const status = [
    { label: "In Stock" },
    { label: "Out of Stock" },
    { label: "Available Soon" },
  ];

  return (
    <section className="products">
      <div className="container">
        <div className="wrapper">
          <div className="content transparent">
            <div className="content_head">
              <Input placeholder="Search Product..." className="sm table_search" />
              <Offcanvas isOpen={isOffcanvasOpen} onClose={() => setIsOffcanvasOpen(false)}>
                <div className="offcanvas-head">
                  <h2>Advanced Search</h2>
                </div>
                <div className="offcanvas-body">
                  <Input
                    type="text"
                    placeholder="Enter product name"
                    label="Name"
                    value={fields.name}
                    onChange={(value) => handleInputChange("name", value)}
                  />
                  <MultiSelect
                    options={stores}
                    placeholder="Select Store"
                    label="Store"
                    isSelected={fields.store}
                    onChange={(value) => handleInputChange("store", value)}
                  />
                  <Dropdown
                    options={status}
                    placeholder="Select Status"
                    label="Status"
                    selectedValue={fields.status}
                    onClick={(value) => handleInputChange("status", value)}
                  />
                  <RangeSlider
                    label="Price range"
                    values={fields.priceRange}
                    onValuesChange={handleSliderChange}
                  />
                </div>
                <div className="offcanvas-footer">
                  <Button label="Discard" className="sm outline" onClick={() => setIsOffcanvasOpen(false)} />
                  <Button label="Filter" className="sm" onClick={() => setIsOffcanvasOpen(false)} />
                </div>
              </Offcanvas>
              <Link to="/catalog/product/add" className="sm button">
                Create Product
              </Link>
            </div>
            <div className="content_body">
              <table className="separate">
                <thead>
                  <tr>
                    <th>
                      <CheckBox onChange={handleBulkCheckbox} isChecked={bulkCheck} />
                    </th>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <CheckBox
                          onChange={(isCheck) => handleCheckProduct(isCheck, product.id)}
                          isChecked={specificChecks[product.id] || false}
                        />
                      </td>
                      <td>{product.id}</td>
                      <td>
                        <img src={product.imageSrc} alt={product.name} />
                      </td>
                      <td>{product.name}</td>
                      <td>
                        {product.price} {product.currency}
                      </td>
                      <td>
                        <TableAction
                          actionItems={["Delete", "Edit"]}
                          onActionItemClick={(item) => handleActionItemClick(item, product.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;
