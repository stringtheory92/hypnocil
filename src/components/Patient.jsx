import React from "react";

function Patient({ patient, onDeceasedChange, onDeletePatient }) {
  const { deceased, id, name, side_effects } = patient;
  //console.log("In Patient! name: ", name);
  const handleDeceasedChange = () => {
    const configObj = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ deceased: !deceased }),
    };
    fetch(`http://localhost:3000/patients/${id}`, configObj)
      .then((r) => r.json())
      .then((data) => onDeceasedChange(data));
  };

  const handleDelete = () => {
    onDeletePatient(patient);
    const configObj = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    };
    fetch(`http://localhost:3000/patients/${id}`, configObj).then(
      console.log("deleted from backend")
    );
  };
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name="deceased"
          id="deceased"
          checked={patient.deceased}
          onChange={handleDeceasedChange}
        />
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{side_effects.join(", ")}</td>
      <td>
        <button onClick={handleDelete}>X</button>
      </td>
    </tr>
  );
}

export default Patient;
