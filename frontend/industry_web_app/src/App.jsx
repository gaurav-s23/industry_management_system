import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import MaterialList from "./pages/MaterialList";
import AddMaterial from "./pages/AddMaterial";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import OrderList from "./pages/OrderList";
import AddOrder from "./pages/AddOrder";
import WorkerList from "./pages/WorkerList";
import AddWorker from "./pages/AddWorker";
import ProductionLogList from "./pages/ProductionLogList";
import AddProductionLog from "./pages/AddProductionLog";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h2>Welcome to Industry Dashboard</h2>} />

        <Route path="/materials" element={<MaterialList />} />
        <Route path="/materials/add" element={<AddMaterial />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/add" element={<AddProduct />} />

        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/add" element={<AddOrder />} />

        <Route path="/logs" element={<ProductionLogList />} />
        <Route path="/logs/add" element={<AddProductionLog />} />

        <Route path="/workers" element={<WorkerList />} />
        <Route path="/workers/add" element={<AddWorker />} />
      </Routes>
    </Layout>
  );
}
