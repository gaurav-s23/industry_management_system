import axios from "axios";
import { useEffect, useState } from "react";

function CompletedOrdersReport() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/reports/completed-orders")
      .then(res => setRows(res.data || []));
  }, []);

  return (
    <div>
      <h3>Completed Production Orders</h3>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? rows.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.product_id}</td>
              <td>{r.quantity}</td>
              <td>{r.due_date}</td>
            </tr>
          )) : (
            <tr><td colSpan="4">No completed orders</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CompletedOrdersReport;
