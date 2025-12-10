import axios from "axios";
import { useEffect, useState } from "react";

function LowStockReport() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/reports/low-stock")
      .then(res => setRows(res.data || []));
  }, []);

  return (
    <div>
      <h3>Low Stock Materials</h3>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? rows.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.unit}</td>
              <td>{r.current_stock}</td>
            </tr>
          )) : (
            <tr><td colSpan="3">No low stock items</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LowStockReport;
