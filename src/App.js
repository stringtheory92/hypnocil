import "./App.css";
import Header from "./components/Header";
import NewPatientForm from "./components/NewPatientForm";
import PatientList from "./components/PatientList";
import React, { useState, useEffect } from "react";

function App() {
  const [allPatients, setAllPatients] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/patients")
      .then((r) => r.json())
      .then((data) => setAllPatients(data));
  }, []);

  const onSearch = (e) => {
    setQuery(e.target.value);
  };

  const onDeceasedChange = (patient) => {
    console.log("patient: ", patient);
    const updatedPatients = allPatients.map((oldPatient) => {
      return oldPatient.id === patient.id ? patient : oldPatient;
    });
    setAllPatients(updatedPatients);
  };

  const onDeletePatient = (patient) => {
    console.log("patient deleted: ", patient);
    const updatedPatients = allPatients.filter(
      (oldPatient) => oldPatient.id !== patient.id
    );
    setAllPatients(updatedPatients);
  };

  return (
    <div className="root">
      <Header onSearch={onSearch} />
      <div className="content">
        <NewPatientForm />
        <PatientList
          allPatients={allPatients}
          query={query}
          onDeceasedChange={onDeceasedChange}
          onDeletePatient={onDeletePatient}
        />
      </div>
    </div>
  );
}

export default App;
