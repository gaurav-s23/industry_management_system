import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/orders")
      .then(res => setOrders(res.data || []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div>
      <h3>Production Orders</h3>

      <Link to="/orders/add">
        <button style={{ marginBottom: "15px" }}>Create Order</button>
      </Link>

      <table border="1" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Start</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(o => (
              <tr key={o.id}>
                <td>{o.product_id}</td>
                <td>{o.quantity}</td>
                <td>{o.status}</td>
                <td>{o.start_date}</td>
                <td>{o.due_date}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No orders found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
