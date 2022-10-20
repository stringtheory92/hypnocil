import React, { useState } from "react";

function NewPatientForm() {
  const [allSideEffects, setAllSideEffects] = useState([
    "dizziness",
    "nausea",
    "somnambulism",
    "memory",
    "allergy",
    "headache",
  ]);
  const [filteredEffects, setFilteredEffects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    side_effects: [],
    deceased: false,
  });

  const handleChange = (e) => {
    const { name, value, localName } = e.target;
    if (localName === "select") addSideEffect(value);

    setFormData({ ...formData, [name]: name === "name" ? value : [value] });
  };
  console.log("formData: ", formData);

  const addSideEffect = (sideEffect) => {
    console.log("adding sideEffect:", sideEffect);
    const baseList =
      filteredEffects.length > 0 ? filteredEffects : allSideEffects;
    console.log("baseList: ", baseList);
    const remaining = baseList.filter((effect) => effect !== sideEffect);
    setFilteredEffects(remaining);
  };

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
        {filteredEffects.length > 0 ? (
          <select onChange={handleChange}>
            {filteredEffects.map((effect) => (
              <option value={effect} key={effect}>
                {effect.slice(0, 1).toUpperCase() + effect.slice(1)}
              </option>
            ))}
          </select>
        ) : null}
        <input type="submit" value="Add Patient" />
      </form>
    </>
  );
}

export default NewPatientForm;
