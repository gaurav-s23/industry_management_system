import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddWorker() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/workers", null, {
      params: { name, role, phone }
    })
      .then(() => navigate("/workers"))
      .catch(() => alert("Error adding worker"));
  };

  return (
    <div>
      <h3>Add Worker</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Worker Name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        /><br/><br/>

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
        /><br/><br/>

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        /><br/><br/>

        <button type="submit">Save Worker</button>
      </form>
    </div>
  );
}

export default AddWorker;
