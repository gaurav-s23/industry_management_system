import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products")
      .then(res => setProducts(res.data || []))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div>
      <h3>Products List</h3>

      <Link to="/products/add">
        <button style={{ marginBottom: "15px" }}>Add Product</button>
      </Link>

      <table border="1" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>{p.current_stock}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No products found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
