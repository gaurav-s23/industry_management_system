import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/products", null, {
      params: { name, sku, description }
    })
    .then(() => navigate("/products"))
    .catch(() => alert("Error adding product"));
  };

  return (
    <div>
      <h3>Add Product</h3>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" required  
          value={name} onChange={e => setName(e.target.value)} /><br/><br/>

        <input type="text" placeholder="SKU Code" required  
          value={sku} onChange={e => setSku(e.target.value)} /><br/><br/>

        <textarea placeholder="Description"  
          value={description} onChange={e => setDescription(e.target.value)} /><br/><br/>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddProduct;
