import axios from "axios";
import { useEffect, useState } from "react";

function ProductStockReport() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/reports/product-stock")
      .then(res => setRows(res.data || []));
  }, []);

  return (
    <div>
      <h3>Product Stock Summary</h3>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? rows.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.sku}</td>
              <td>{r.current_stock}</td>
            </tr>
          )) : (
            <tr><td colSpan="3">No product stock records</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductStockReport;
