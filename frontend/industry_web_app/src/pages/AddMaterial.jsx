import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert } from "@mui/material";

export default function AddMaterial() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");

  // Snackbar control
  const [open, setOpen] = useState(false);

  function saveMaterial() {
    axios.post("http://127.0.0.1:8000/materials", {
      name,
      unit,
      description
    })
      .then(() => {
        setOpen(true);
        setTimeout(() => navigate("/materials"), 1200);
      })
      .catch(err => console.log(err));
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add Material</h2>

      <TextField
        label="Material Name"
        fullWidth
        required
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Unit (e.g Kg, Ltr, Box)"
        fullWidth
        required
        margin="normal"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ marginTop: "20px" }}
        onClick={saveMaterial}
      >
        Save Material
      </Button>

      {/* Success Toast */}
      <Snackbar open={open} autoHideDuration={1000}>
        <Alert severity="success" variant="filled">
          Material Added Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
