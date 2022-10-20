import React, { useState } from "react";

function NewPatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    side_effects: [],
    deceased: false,
  });

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "name" ? value : [value] });
  };
  console.log("formData: ", formData);
  const handleSubmit = () => {
    const configObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(`http://localhost:3000/patients/`, configObj)
      .then((r) => r.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <form id="new-patient-form" onSubmit={handleSubmit}>
        <input
          id="patient-name"
          type="text"
          placeholder="Patient Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <select
          name="side_effects"
          id="side-effects"
          form="new-patient-form"
          value={formData.side_effects[0]}
          onChange={handleChange}
        >
          <option value="dizziness">Dizziness</option>
          <option value="nausea">Nausea</option>
          <option value="somnambulism">Somnambulism</option>
          <option value="memory">Memory</option>
          <option value="allergy">Severe Allergic Reaction</option>
          <option value="headache">Headache</option>
        </select>
        <input type="submit" value="Add Patient" />
      </form>
    </>
  );
}

export default NewPatientForm;
