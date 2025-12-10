import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WorkerList() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/workers")
      .then(res => setWorkers(res.data || []))
      .catch(() => setWorkers([]));
  }, []);

  return (
    <div>
      <h3>Workers List</h3>

      <Link to="/workers/add">
        <button style={{ marginBottom: "15px" }}>Add Worker</button>
      </Link>

      <table border="1" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {workers.length > 0 ? (
            workers.map(w => (
              <tr key={w.id}>
                <td>{w.name}</td>
                <td>{w.role}</td>
                <td>{w.phone}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No workers found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WorkerList;
