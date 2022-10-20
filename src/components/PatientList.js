import React from "react";
import Patient from "./Patient";

function PatientList({
  allPatients,
  query,
  onDeceasedChange,
  onDeletePatient,
}) {
  console.log("in patientList! allPatients: ", allPatients);
  console.log("query: ", query);
  //console.log("Boolean(/" / ")", Boolean(""));
  const listOfPatients = allPatients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.side_effects.includes(query)
    )
    .map((patient) => {
      return (
        <Patient
          key={patient.id}
          patient={patient}
          onDeceasedChange={onDeceasedChange}
          onDeletePatient={onDeletePatient}
        />
      );
    });

  return (
    <table>
      <tbody>
        <tr>
          <th>Deceased</th>
          <th>Patient ID</th>
          <th>Patient Name</th>
          <th>Noted Side Effects</th>
          <th>Delete</th>
        </tr>
        {allPatients ? listOfPatients : <h2>Loading...</h2>}
      </tbody>
    </table>
  );
}

export default PatientList;
