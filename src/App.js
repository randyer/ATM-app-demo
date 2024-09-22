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
  let clientTesting = [
    {
      active: true,
      assessment: "",
      city: "New York",
      current_symptoms: "Headache, back pain",
      dob: "2024-08-27",
      email: "johndoe@example.com",
      emergency_contact: "Jane Doe",
      emergency_contact_phone: "123-456-7890",
      favorite: false,
      first_name: "John",
      form_data:
        "Current Symptoms: \n\nPast Symptoms: \n\nPast Injuries: \n\nPast Surgeries: ",
      general_notes:
        "Client requested more focus on lower back tension during next session. \n\nDone:\n- Added frequency options to form\n- Improved save button responsiveness\n- Adjusted form layout for mobile view",
      heard_about_us: "friend_family",
      id: "c333a671-85bf-4a9e-81f4-6da522dd4544",
      last_name: "Doe",
      last_status_change: "2024-09-06T15:52:46.106Z",
      last_updated: "2024-09-06T16:03:54.052Z",
      needs_review: true,
      objective: "Improve mobility",
      past_injuries: "Broken leg",
      past_surgeries: "Appendectomy",
      past_symptoms: "Knee pain",
      phone: "123-555-7890",
      plan: "Weekly massage sessions",
      state: "NY",
      status: "active",
      street: "123 Main St",
      waitlist_notes: "",
      waitlisted: false,
      zip: "10001",
    },
    {
      active: true,
      assessment: "",
      city: "Boston",
      current_symptoms: "Neck pain",
      dob: "2024-08-27",
      email: "janedoe@example.com",
      emergency_contact: "John Doe",
      emergency_contact_phone: "234-567-8901",
      favorite: true,
      first_name: "Jane",
      form_data:
        "Current Symptoms: \n\nPast Symptoms: \n\nPast Injuries: \n\nPast Surgeries: ",
      general_notes:
        "Client's back pain has improved; will focus on shoulder tension moving forward. \n\nDone:\n- Added new assessment fields\n- Enhanced accessibility for visually impaired users\n- Addressed multiple form submission error",
      heard_about_us: "friend_family",
      id: "d345a671-85bf-4a9e-81f4-7ea522dd4521",
      last_name: "Doe",
      last_status_change: "2024-09-06T15:52:46.106Z",
      last_updated: "2024-09-06T16:03:54.052Z",
      needs_review: false,
      objective: "Reduce tension",
      past_injuries: "Sprained ankle",
      past_surgeries: "None",
      past_symptoms: "None",
      phone: "234-555-8901",
      plan: "Monthly massage sessions",
      state: "MA",
      status: "waitlist",
      street: "456 Elm St",
      waitlist_notes: "Client prefers evening appointments",
      waitlisted: true,
      zip: "02116",
    },
    {
      active: false,
      assessment: "",
      city: "Chicago",
      current_symptoms: "Lower back pain",
      dob: "2024-08-27",
      email: "bobsmith@example.com",
      emergency_contact: "Alice Smith",
      emergency_contact_phone: "345-678-9012",
      favorite: false,
      first_name: "Bob",
      form_data:
        "Current Symptoms: \n\nPast Symptoms: \n\nPast Injuries: \n\nPast Surgeries: ",
      general_notes:
        "Client prefers aromatherapy during sessions. \n\nDone:\n- Added scent options to preferences\n- Resolved loading issue on the client intake form\n- Auto-save feature now functional",
      heard_about_us: "friend_family",
      id: "e456a671-85bf-4a9e-81f4-8fb522dd4542",
      last_name: "Smith",
      last_status_change: "2024-09-06T15:52:46.106Z",
      last_updated: "2024-09-06T16:03:54.052Z",
      needs_review: true,
      objective: "Pain relief",
      past_injuries: "Herniated disc",
      past_surgeries: "Knee surgery",
      past_symptoms: "Shoulder pain",
      phone: "345-555-9012",
      plan: "Physical therapy referral",
      state: "IL",
      status: "archive",
      street: "789 Oak St",
      waitlist_notes: "",
      waitlisted: false,
      zip: "60601",
    },
    {
      active: true,
      assessment: "",
      city: "Los Angeles",
      current_symptoms: "Chronic neck stiffness",
      dob: "2024-08-27",
      email: "alicebrown@example.com",
      emergency_contact: "George Brown",
      emergency_contact_phone: "456-789-0123",
      favorite: true,
      first_name: "Alice",
      form_data:
        "Current Symptoms: \n\nPast Symptoms: \n\nPast Injuries: \n\nPast Surgeries: ",
      general_notes:
        "Client mentioned increased stress levels. Recommended more frequent sessions. \n\nDone:\n- Rearranged sorting order for better visibility\n- Fixed visual bug on confirmation screen\n- Added new icon set for status indicators",
      heard_about_us: "friend_family",
      id: "f567b671-85bf-4a9e-81f4-9ab522dd4533",
      last_name: "Brown",
      last_status_change: "2024-09-06T15:52:46.106Z",
      last_updated: "2024-09-06T16:03:54.052Z",
      needs_review: false,
      objective: "Reduce stiffness",
      past_injuries: "Whiplash",
      past_surgeries: "None",
      past_symptoms: "Shoulder stiffness",
      phone: "456-555-0123",
      plan: "Bi-weekly massage sessions",
      state: "CA",
      status: "rebook",
      street: "123 Sunset Blvd",
      waitlist_notes: "",
      waitlisted: false,
      zip: "90001",
    },
    {
      active: true,
      assessment: "",
      city: "Houston",
      current_symptoms: "Knee pain",
      dob: "2024-08-27",
      email: "michaeljones@example.com",
      emergency_contact: "Sarah Jones",
      emergency_contact_phone: "567-890-1234",
      favorite: true,
      first_name: "Michael",
      form_data:
        "Current Symptoms: \n\nPast Symptoms: \n\nPast Injuries: \n\nPast Surgeries: ",
      general_notes:
        "Client expressed interest in deep tissue massage for next session. \n\nDone:\n- Fixed display issues in symptoms section\n- Updated email notifications for session reminders\n- Optimized page load time",
      heard_about_us: "friend_family",
      id: "g678b671-85bf-4a9e-81f4-9bc522dd4534",
      last_name: "Jones",
      last_status_change: "2024-09-06T15:52:46.106Z",
      last_updated: "2024-09-06T16:03:54.052Z",
      needs_review: false,
      objective: "Reduce knee pain",
      past_injuries: "ACL tear",
      past_surgeries: "Knee surgery",
      past_symptoms: "Leg pain",
      phone: "567-555-1234",
      plan: "Physical therapy referral",
      state: "TX",
      status: "active",
      street: "456 Pine St",
      waitlist_notes: "",
      waitlisted: false,
      zip: "77001",
    },
    {
      active: true,
      assessment: "",
      city: "Philadelphia",
      current_symptoms: "Wrist pain",
      dob: "2024-08-27",
      email: "jennysmith@example.com",
      emergency_contact: "Tom Smith",
      emergency_contact_phone: "678-901-2345",
      favorite: false,
      first_name: "Jenny",
      form_data:
        "Current Symptoms: \n\nPast Symptoms: \n\nPast Injuries: \n\nPast Surgeries: ",
      general_notes:
        "Client's back pain has improved; will focus on shoulder tension moving forward. \n\nDone:\n- Added new assessment fields\n- Enhanced accessibility for visually impaired users\n- Addressed multiple form submission error",
      heard_about_us: "friend_family",
      id: "h789b671-85bf-4a9e-81f4-9cd522dd4535",
      last_name: "Smith",
      last_status_change: "2024-09-06T15:52:46.106Z",
      last_updated: "2024-09-06T16:03:54.052Z",
      needs_review: true,
      objective: "Improve wrist mobility",
      past_injuries: "Wrist fracture",
      past_surgeries: "None",
      past_symptoms: "Finger numbness",
      phone: "678-555-2345",
      plan: "Occupational therapy referral",
      state: "PA",
      status: "waitlist",
      street: "789 Cedar St",
      waitlist_notes: "Client prefers early morning appointments",
      waitlisted: true,
      zip: "19103",
    },
    {
      active: false,
      assessment: "",
      city: "Phoenix",
      current_symptoms: "Foot pain",
      dob: "2024-08-27",
      email: "markjohnson@example.com",
      emergency_contact: "Linda Johnson",
      emergency_contact_phone: "789-012-3456",
      favorite: false,
      first_name: "Mark",
      form_data:
        "Current Symptoms: \n\nPast Symptoms: \n\nPast Injuries: \n\nPast Surgeries: ",
      general_notes:
        "Client mentioned new symptoms of neck discomfort. \n\nDone:\n- Implemented auto-fill feature for frequently used fields\n- Added export option for client history\n- Improved responsiveness of the calendar input",
      heard_about_us: "friend_family",
      id: "i890c671-85bf-4a9e-81f4-9de522dd4536",
      last_name: "Johnson",
      last_status_change: "2024-09-06T15:52:46.106Z",
      last_updated: "2024-09-06T16:03:54.052Z",
      needs_review: true,
      objective: "Pain management",
      past_injuries: "Ankle sprain",
      past_surgeries: "None",
      past_symptoms: "Heel pain",
      phone: "789-555-3456",
      plan: "Podiatrist referral",
      state: "AZ",
      status: "archive",
      street: "101 Palm St",
      waitlist_notes: "",
      waitlisted: false,
      zip: "85001",
    },
    {
      active: true,
      assessment: "",
      city: "San Antonio",
      current_symptoms: "Hip pain",
      dob: "2024-08-27",
      email: "kevinmartin@example.com",
      emergency_contact: "Nancy Martin",
      emergency_contact_phone: "890-123-4567",
      favorite: false,
      first_name: "Kevin",
      form_data:
        "Current Symptoms: \n\nPast Symptoms: \n\nPast Injuries: \n\nPast Surgeries: ",
      general_notes:
        "Client requested more focus on lower back tension during next session. \n\nDone:\n- Added frequency options to form\n- Improved save button responsiveness\n- Adjusted form layout for mobile view",
      heard_about_us: "friend_family",
      id: "j901c671-85bf-4a9e-81f4-9ef522dd4537",
      last_name: "Martin",
      last_status_change: "2024-09-06T15:52:46.106Z",
      last_updated: "2024-09-06T16:03:54.052Z",
      needs_review: false,
      objective: "Improve mobility",
      past_injuries: "Hip fracture",
      past_surgeries: "Hip replacement",
      past_symptoms: "Leg pain",
      phone: "890-555-4567",
      plan: "Physical therapy referral",
      state: "TX",
      status: "active",
      street: "202 Birch St",
      waitlist_notes: "",
      waitlisted: false,
      zip: "78201",
    },
  ];
  const [clients, setClients] = useState(clientTesting);
  const [refreshClicked, setRefreshClicked] = useState(false);
  const [sortMethod, setSortMethod] = useState("alphabetical");

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
        backgroundColor: "#89709E",
      }}
    >
      {/* <Authenticator hideSignUp={true}> */}
      {/* {({ signOut }) => ( */}
      <main
        style={{
          maxWidth: "420px",
          margin: "0 auto",
          backgroundColor: "#89709E",

          // border: "1px solid black", // Add border
          // padding: "10px", // Add padding for better appearance
        }}
      >
        <Router basename="">
          <ScrollToTop />
          <div
            className="App"
            style={{
              maxWidth: "400px",
              // margin: "0 auto",
              // maxHeight: "calc(100vh - 28px - 20px)",
              backgroundColor: "black",
              borderRadius: "28px",
              // border: "1px solid black", // Add border
              padding: "20px", // Add padding for better appearance
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
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
