import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductionLogList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/logs")
      .then(res => setLogs(res.data || []))
      .catch(() => setLogs([]));
  }, []);

  return (
    <div>
      <h3>Production Logs</h3>

      <Link to="/logs/add">
        <button style={{ marginBottom: "15px" }}>Add Log Entry</button>
      </Link>

      <table border="1" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Order</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map(l => (
              <tr key={l.id}>
                <td>{l.order_id}</td>
                <td>{l.product_id}</td>
                <td>{l.quantity}</td>
                <td>{l.log_date}</td>
                <td>{l.notes}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No logs found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductionLogList;
