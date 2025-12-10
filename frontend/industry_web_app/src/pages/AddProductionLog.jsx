import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProductionLog() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/orders").then(res => setOrders(res.data));
    axios.get("http://127.0.0.1:8000/products").then(res => setProducts(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/logs", null, {
      params: {
        order_id: orderId,
        product_id: productId,
        log_date: date,
        qty,
        notes
      }
    })
      .then(() => navigate("/logs"))
      .catch(() => alert("Error adding log"));
  };

  return (
    <div>
      <h3>Add Production Log</h3>

      <form onSubmit={handleSubmit}>
        <select required onChange={(e) => setOrderId(e.target.value)}>
          <option value="">Select Order</option>
          {orders.map(o => (
            <option key={o.id} value={o.id}>{o.id} - {o.status}</option>
          ))}
        </select><br/><br/>

        <select required onChange={(e) => setProductId(e.target.value)}>
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select><br/><br/>

        <input type="number" placeholder="Quantity" required 
          value={qty} onChange={(e) => setQty(e.target.value)} /><br/><br/>

        <input type="date" required
          value={date} onChange={(e) => setDate(e.target.value)} /><br/><br/>

        <textarea placeholder="Notes"
          value={notes} onChange={(e) => setNotes(e.target.value)} /><br/><br/>

        <button type="submit">Save Log</button>
      </form>
    </div>
  );
}

export default AddProductionLog;
