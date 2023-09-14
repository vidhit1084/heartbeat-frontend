import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [clients, setClients] = useState([]);
  const [stores, setStores] = useState([]);
  const [software, setSoftware] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStore, setSelectedStore] = useState("");

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
    <div>
      <h1>Client List</h1>
      <ul>
        {clients.length > 0 ? (
          clients.map((client) => (
            <li key={client} onClick={() => setSelectedClient(client)}>
              {client}
            </li>
          ))
        ) : (
          <li>No clients available</li>
        )}
      </ul>

      {selectedClient && (
        <div>
          <h2>Store List for {selectedClient}</h2>
          <ul>
            {stores.length > 0 ? (
              stores.map((store) => (
                <li key={store} onClick={() => setSelectedStore(store)}>
                  {store}
                </li>
              ))
            ) : (
              <li>No stores available for {selectedClient}</li>
            )}
          </ul>
        </div>
      )}

      {selectedClient && selectedStore && (
        <div>
          <h3>
            Software Data for {selectedClient} - {selectedStore}
          </h3>
          <ul>
            {software.length > 0 ? (
              software.map((entry, index) => (
                <li key={index}>
                  Software: {entry.software}, App: {entry.app}
                </li>
              ))
            ) : (
              <li>
                No software data available for {selectedClient} -{" "}
                {selectedStore}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
