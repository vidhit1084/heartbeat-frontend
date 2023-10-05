import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
const Home = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [stores, setStores] = useState([]);
  const [software, setSoftware] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const user = localStorage.getItem("user");
  const token = user ? user.token : "";
  // eslint-disable-next-line no-unused-vars
  const iconClass = check ? "pointy-icon rotated" : "pointy-icon";

  //   const handleSelectedStore = (store) => {
  //     setSelectedStore(store);
  //     setIsModalOpen(true);
  //   };

  useEffect(() => {
    // Fetch unique clients
    axios
      .get("https://api.metadome.ai/heartbeat-dev/ping/clients", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      })
      .then((response) => {
        setClients(response.data.clients);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, [token]);

  useEffect(() => {
    // Fetch unique stores for the selected client
    if (selectedClient) {
      axios
        .get(`https://api.metadome.ai/heartbeat-dev/ping/store?client=${selectedClient}`)
        .then((response) => {
          setStores(response.data.stores);
        })
        .catch((error) => {
          console.error("Error fetching stores:", error);
        });
    }
  }, [selectedClient]);

  useEffect(() => {
    // Fetch software data for the selected client and store
    if (selectedClient && selectedStore) {
      axios
        .get(
          `https://api.metadome.ai/heartbeat-dev/ping/software?client=${selectedClient}&store=${selectedStore}`
        )
        .then((response) => {
          setSoftware(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching software:", error);
        });
    }
  }, [selectedClient, selectedStore]);
  // console.log(software[0], "nanana");
  software.map((entry) => {
    console.log(entry.software);
    console.log(entry.app);
    console.log(entry.status);
    return 0;
  });

  return (
    <div className="mt-5 container">
      <h1> InStore Health Tracker</h1>
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
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th className="col">S no.</th>
                  <th className="col">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {clients.length > 0
                  ? clients.map((client, index) => (
                      <tr key={client}>
                        <td>{index + 1}</td>
                        <td>
                          <span className="m-4">{client}</span>
                          <FontAwesomeIcon
                            icon={faSortDown}
                            className="pointy-icon"
                            onClick={() => {
                              setSelectedClient(client);
                              setSelectedStore("");
                              setCheck(!check);
                            }}
                          />

                          {check && (
                            <div>
                              <table className="table">
                                {/* <thead>
                          <tr>
                            <th className="col">S no.</th>
                            <th className="col">Store Name</th>
                          </tr>
                        </thead> */}
                                <tbody>
                                  {selectedClient &&
                                    selectedClient === client &&
                                    (stores.length > 0 ? (
                                      stores.map((store, index) => (
                                        <tr key={store}>
                                          <td>{index + 1}</td>
                                          <td>
                                            <span className="m-4">{store}</span>

                                            {/* <div>
                                      <table className="table">
                                        <tbody>
                                          {selectedClient &&
                                            selectedStore &&
                                            selectedClient === client &&
                                            selectedStore === store &&
                                            (software.length > 0 ? (
                                              software.map((idx) => (
                                                <tr key={idx}>
                                                  <td>{idx.software}</td>
                                                  <td>{idx.app}</td>
                                                </tr>
                                              ))
                                            ) : (
                                              <h1>
                                                No softwares available for this
                                                store
                                              </h1>
                                            ))}
                                        </tbody>
                                      </table>
                                    </div> */}
                                          </td>
                                          <td>
                                            {" "}
                                            <button
                                              onClick={() => {
                                                setSelectedStore(store);
                                                setIsModalOpen(true);
                                              }}
                                              type="button"
                                            >
                                              View Software
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <p>
                                        {" "}
                                        No stores available for this client
                                      </p>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  : // <span>No Clients Available</span>
                    null}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <div
              style={isModalOpen && { display: "block" }}
              className={`${isModalOpen && "show-modal"} modal`}
            >
              <div className="modal-content">
                <span className="close" onClick={() => setIsModalOpen(false)}>
                  &times;
                </span>
                <h2>Store Information</h2>
                <p>Store Name: {selectedStore}</p>
                <h3>Software</h3>
                {software.length > 0 ? (
                  <ul>
                    {software.map((entry, index) => (
                      <li key={index}>
                        Software: {entry.software}, App: {entry.app}, status:{" "}
                        <span
                          className={`status-dot ${
                            entry.status ? "green-dot" : "red-dot"
                          }`}
                        ></span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No software available for this store.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
