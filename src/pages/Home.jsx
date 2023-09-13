import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [resp, setResp] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/ping")
      .then((response) => {
        setResp(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Clients List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Store</th>
            <th>Software</th>
            <th>App</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {resp.map((idx) => (
            <tr key={idx.id}>
              <td>{idx.id}</td>
              <td>{idx.client}</td>
              <td>{idx.store}</td>
              <td>{idx.software}</td>
              <td>{idx.app}</td>
              <td>{idx.createdAt}</td>
              <td>{idx.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
