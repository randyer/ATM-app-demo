import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientInfo from "./ClientInfo";
// import { post } from "aws-amplify/api";
// import { fetchClients } from "./helper/ClientApi";

// components
import ClientList from "./components/ClientList";
import ScrollToTop from "./components/ScrollToTop";

// css
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./css/variables.css";
import "./css/App.css";

// svgs
import { ReactComponent as AddButton } from "./icons/add.svg";
import { ReactComponent as SignOut } from "./icons/logout.svg";
import { ReactComponent as Refresh } from "./icons/refresh.svg";
import { ReactComponent as SortAlpha } from "./icons/sortAlpha.svg";
import { ReactComponent as Upcoming } from "./icons/upcoming.svg";
import { ReactComponent as Modified } from "./icons/history.svg";

// import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
import { Button, Dropdown } from "react-bootstrap";

function App() {
  let clientTesting = require("./helper/clientList.json");
  const [clients, setClients] = useState(clientTesting);
  const [refreshClicked, setRefreshClicked] = useState(false);
  const [sortMethod, setSortMethod] = useState("alphabetical");
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleDisclaimerClose = () => {
    setShowDisclaimer(false);
  };

  useEffect(() => {
    // fetchClients(setClients);
  }, []);

  useEffect(() => {
    console.log("Clients state updated:", clients);
  }, [clients]);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  const addClient = async () => {
    const newFirstName = prompt("Enter client first name:");
    const newLastName = prompt("Enter client last name:");
    const newPhone = prompt("Enter client phone number:");
    const newEmail = prompt("Enter client email:");
    const newDob = prompt("Enter client date of birth (YYYY-MM-DD):");
    const newStreet = prompt("Enter client street address:");
    const newCity = prompt("Enter client city:");
    const newState = prompt("Enter client state:");
    const newZip = prompt("Enter client zip code:");
    const newEmergencyContact = prompt("Enter emergency contact name:");
    const newEmergencyContactPhone = prompt(
      "Enter emergency contact phone number:"
    );
    const newHeardAboutUs = prompt("How did the client hear about us?");
    const newCurrentSymptoms = prompt("Enter current symptoms:");
    const newPastSymptoms = prompt("Enter past symptoms:");
    const newPastInjuries = prompt("Enter past injuries:");
    const newPastSurgeries = prompt("Enter past surgeries:");
    const newGeneralNotes = prompt("Enter general notes:");
    const newObjective = prompt("Enter objective:");
    const newAssessment = prompt("Enter assessment:");
    const newPlan = prompt("Enter plan:");
    const newWaitlistNotes = prompt("Enter waitlist notes:");

    if (newFirstName && newLastName && newPhone) {
      const newClient = {
        first_name: newFirstName || null,
        last_name: newLastName || null,
        phone: newPhone || null,
        email: newEmail || null,
        dob: newDob || null,
        street: newStreet || null,
        city: newCity || null,
        state: newState || null,
        zip: newZip || null,
        emergency_contact: newEmergencyContact || null,
        emergency_contact_phone: newEmergencyContactPhone || null,
        heard_about_us: newHeardAboutUs || null,
        current_symptoms: newCurrentSymptoms || null,
        past_symptoms: newPastSymptoms || null,
        past_injuries: newPastInjuries || null,
        past_surgeries: newPastSurgeries || null,
        general_notes: newGeneralNotes || null,
        objective: newObjective || null,
        assessment: newAssessment || null,
        plan: newPlan || null,
        waitlist_notes: newWaitlistNotes || null,
        active: true,
        favorite: false,
        needs_review: false,
        waitlisted: false,
      };

      // try {
      //   // First, post the new client to the database
      //   const restOperation = await post({
      //     apiName: "apiclient",
      //     path: "/clients",
      //     options: {
      //       body: { ...newClient },
      //     },
      //   });

      //   const { body } = await restOperation.response;
      //   const response = await body.json();

      //   if (response) {
      //     // fetchClients(setClients);
      //   }
      // } catch (error) {
      //   console.error("Error adding or fetching clients:", error);
      // }
    }
  };

  const getInitials = (firstName, lastName) => {
    return (firstName[0] + lastName[0]).toUpperCase();
  };

  const filteredClients = clients.filter(
    (client) =>
      (client.first_name + " " + client.last_name)
        .toLowerCase()
        .includes(search.toLowerCase()) && client.status === activeTab
  );

  return (
    <div
      className="App"
      style={{
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* <Authenticator hideSignUp={true}> */}
      {/* {({ signOut }) => ( */}
      <main
        style={{
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <Router basename="/ATM-app-demo">
          <ScrollToTop />
          <div
            className="App"
            style={{
              backgroundColor: "black",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {showDisclaimer && (
                      <div className="disclaimer-popup">
                        <div className="disclaimer-popup-content">
                          <h1>Disclaimer</h1>
                          <p>
                            This is a demo. Please note that all of the data
                            presented here is dummy data for demonstration
                            purposes only.
                          </p>
                          <p>
                            This app is designed as a Progressive Web App (PWA)
                            optimized for mobile devices. Its primary purpose is
                            to help massage therapists and businesses manage
                            their clients effectively. The app includes four
                            main tabs:
                          </p>
                          <ul>
                            <li>
                              <strong>Active:</strong> Clients currently being
                              seen.
                            </li>
                            <li>
                              <strong>Waitlist:</strong> Clients waiting to be
                              seen.
                            </li>
                            <li>
                              <strong>Re-book:</strong> Clients who need to be
                              re-booked for future appointments.
                            </li>
                            <li>
                              <strong>Archive:</strong> Clients whose profiles
                              are archived.
                            </li>
                          </ul>
                          <p>By clicking on a client, you can:</p>
                          <ul>
                            <li>Favorite the client.</li>
                            <li>
                              Toggle that there are important notes about the
                              client.
                            </li>
                            <li>
                              Change the client's status between the four tabs.
                            </li>
                            <li>
                              Keep track of general notes and
                              appointment-specific notes like symptoms,
                              assessment, and plan.
                            </li>
                          </ul>
                          <button onClick={handleDisclaimerClose}>
                            I Understand
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="sticky">
                      {/* <div> */}
                      <header className="App-header">
                        <button
                          onClick={() => {
                            setRefreshClicked(true);
                            // fetchClients(setClients);
                            window.location.reload();
                            setTimeout(() => setRefreshClicked(false), 300); // Reset after 300ms
                          }}
                          className={refreshClicked ? "button-clicked" : ""}
                        >
                          <h1>
                            Clients <Refresh className="svg-icon" />
                          </h1>
                        </button>

                        <AddButton
                          onClick={addClient}
                          className="svg-icon"
                        ></AddButton>
                        <SignOut
                          // onClick={signOut}
                          className="svg-icon"
                        ></SignOut>
                      </header>
                      <div className="tabs">
                        <button
                          className={`tab ${
                            activeTab === "active" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("active")}
                        >
                          Active
                        </button>
                        <button
                          className={`tab ${
                            activeTab === "waitlist" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("waitlist")}
                        >
                          Waitlist
                        </button>
                        <button
                          className={`tab ${
                            activeTab === "re-book" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("re-book")}
                        >
                          Re-book
                        </button>
                        <button
                          className={`tab ${
                            activeTab === "archive" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("archive")}
                        >
                          Archive
                        </button>
                      </div>
                      <div className="search-and-sort">
                        <input
                          type="text"
                          placeholder="Search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="search-bar"
                        />
                        <Dropdown>
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            className="dropdown-button"
                          >
                            {sortMethod === "alphabetical" && (
                              <SortAlpha className="svg-icon" />
                            )}
                            {sortMethod === "queue" && (
                              <Upcoming className="svg-icon" />
                            )}
                            {sortMethod === "recentlyModified" && (
                              <Modified className="svg-icon" />
                            )}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => setSortMethod("alphabetical")}
                              className={
                                sortMethod === "alphabetical" ? "selected" : ""
                              }
                            >
                              By Name
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => setSortMethod("queue")}
                              className={
                                sortMethod === "queue" ? "selected" : ""
                              }
                            >
                              Queue
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => setSortMethod("recentlyModified")}
                              className={
                                sortMethod === "recentlyModified"
                                  ? "selected"
                                  : ""
                              }
                            >
                              Recently modified
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <ClientList
                      clients={filteredClients}
                      getInitials={getInitials}
                      waitlist={activeTab === "waitlist"}
                      setClients={setClients}
                      sortMethod={sortMethod}
                      setSortMethod={setSortMethod}
                    />
                  </>
                }
              />
              <Route
                path="/client/:id"
                element={
                  <ClientInfo clients={clients} setClients={setClients} />
                }
              />
            </Routes>
          </div>
        </Router>
      </main>
      {/* // )} */}
      {/* </Authenticator> */}
    </div>
  );
}

// export default withAuthenticator(App);
export default App;
