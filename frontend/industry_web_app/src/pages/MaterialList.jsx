import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function MaterialList() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/materials")
      .then(res => {
        console.log("API DATA:", res.data);
        const formattedData = res.data.map(item => ({
          id: item.id,
          name: item.name,
          unit: item.unit,
          current_stock: item.current_stock,
        }));
        setMaterials(formattedData);
      })
      .catch(err => {
        console.log("API ERROR:", err);
        setMaterials([]);
      });
  }, []);

  const columns = [
    { field: "name", headerName: "Material", width: 200 },
    { field: "unit", headerName: "Unit", width: 120 },
    { field: "current_stock", headerName: "Stock", width: 120 },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: "15px" }}>Materials</h3>

      <Link to="/materials/add">
        <Button variant="contained" color="primary" style={{ marginBottom: "15px" }}>
          + Add Material
        </Button>
      </Link>

      <div style={{ height: 430, width: "100%" }}>
        <DataGrid
          rows={materials}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}

export default MaterialList;
