import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddOrder() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products")
      .then(res => setProducts(res.data || []));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/orders", null, {
      params: {
        product_id: productId,
        qty,
        start_date: startDate,
        due_date: dueDate
      }
    })
      .then(() => navigate("/orders"))
      .catch(() => alert("Error creating order"));
  };

  return (
    <div>
      <h3>Create Production Order</h3>

      <form onSubmit={handleSubmit}>
        <select required onChange={(e) => setProductId(e.target.value)}>
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select><br/><br/>

        <input type="number" placeholder="Quantity" required
          value={qty} onChange={e => setQty(e.target.value)} /><br/><br/>

        <input type="date" required 
          value={startDate} onChange={e => setStartDate(e.target.value)} /><br/><br/>

        <input type="date" required 
          value={dueDate} onChange={e => setDueDate(e.target.value)} /><br/><br/>

        <button type="submit">Save Order</button>
      </form>
    </div>
  );
}

export default AddOrder;
