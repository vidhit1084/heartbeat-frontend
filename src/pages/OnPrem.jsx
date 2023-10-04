import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/OnPrem.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const OnPrem = () => {
  const [data, setData] = useState([]);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  // Function to format a date into "dd/mm/yyyy" format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to format a time into "hh:mm:ss" format
  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };

  // Function to calculate the status (Active or Inactive) based on updatedAt
  const calculateStatus = (updatedAt) => {
    const updatedAtTimestamp = new Date(updatedAt).getTime();
    const currentTimestamp = new Date().getTime();
    const gapInSeconds = (currentTimestamp - updatedAtTimestamp) / 1000;
    return gapInSeconds > 30 ? "Inactive" : "Active";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/on-prem");
        if (Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((item) => ({
            ...item,
            createdAt:
              formatDate(item.createdAt) + ", " + formatTime(item.createdAt),
            updatedAt:
              formatDate(item.updatedAt) + ", " + formatTime(item.updatedAt),
            status: calculateStatus(item.updatedAt), // Calculate status here
          }));
          setData(formattedData);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching IP's", error);
      }
    };
    fetchData();

    // Set up a setInterval to refresh data every 30 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container mt-4">
      <h2>IP Data Table</h2>
      {user ? (
        <div>
          <NavBar />

          <button
            className="logout btn btn-primary mb-5"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
      )}

      {user && (
        <div>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Sno</th>
                <th>IP Address</th>
                <th>createdAt</th>
                <th>updatedAt</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.ip}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.updatedAt}</td>
                  <td>
                    {item.status && (
                      <span
                        className={`status-dot ${item.status.toLowerCase()}`}
                      ></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OnPrem;
