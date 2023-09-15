import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
const Home = () => {
  const [clients, setClients] = useState([]);
  const [stores, setStores] = useState([]);
  const [software, setSoftware] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [check, setCheck] = useState(false);

  //   const handleSelectedStore = (store) => {
  //     setSelectedStore(store);
  //     setIsModalOpen(true);
  //   };

  useEffect(() => {
    // Fetch unique clients
    axios
      .get("http://localhost:3001/ping/clients")
      .then((response) => {
        setClients(response.data.clients);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch unique stores for the selected client
    if (selectedClient) {
      axios
        .get(`http://localhost:3001/ping/store?client=${selectedClient}`)
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
          `http://localhost:3001/ping/software?client=${selectedClient}&store=${selectedStore}`
        )
        .then((response) => {
          setSoftware(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching software:", error);
        });
    }
  }, [selectedClient, selectedStore]);

  return (
    <div className="mt-5 container">
      <h1>Health Tracker</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th className="col">S no.</th>
              <th className="col">Client Name</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map((client, index) => (
                <tr key={client}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="m-4">{client}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedClient(client);
                        setSelectedStore("");
                        setCheck(!check);
                      }}
                    >
                      View
                    </button>
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
                                      <button
                                        onClick={() => {
                                          setSelectedStore(store);
                                          setIsModalOpen(true);
                                        }}
                                        type="button"
                                      >
                                        View Software
                                      </button>
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
                                  </tr>
                                ))
                              ) : (
                                <h1> No stores available for this client</h1>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <h1>No Clients Available</h1>
            )}
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
                    Software: {entry.software}, App: {entry.app}
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
  );
};

export default Home;
