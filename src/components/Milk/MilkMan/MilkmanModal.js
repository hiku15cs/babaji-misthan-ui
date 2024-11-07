import React, { useState } from "react";
import { addMilkman, fetchMilkMen } from "../../../API/MilkmanAPI"; // Import API function
import "./milkmanModal.css";

const MilkmanModal = ({ isOpen, onClose, setMilkMen }) => {
  const [milkmanDetails, setMilkmanDetails] = useState({
    milk_man_name: "",
    milk_man_mobile: "",
    cow_milk_rate: "",
    buffalo_milk_rate: "",
  });

  if (!isOpen) return null; // Return nothing if the modal is not open

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMilkmanDetails({ ...milkmanDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMilkman(milkmanDetails);
      alert("Milkman added successfully!");
      setMilkmanDetails({
        milk_man_name: "",
        milk_man_mobile: "",
        cow_milk_rate: "",
        buffalo_milk_rate: "",
      });
      fetchMilkMen()
      .then((data) => setMilkMen(data))
      .catch((error) => console.error("Error fetching milkmen:", error));

      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding milkman:", error);
      alert("Failed to add milkman.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Milkman</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <label className="form-label me-3">Milkman Name:</label>
            <input
              type="text"
              name="milk_man_name"
              value={milkmanDetails.milk_man_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 input-group">
            <label className="form-label me-3">Mobile:</label>
            <input
              type="number"
              name="milk_man_mobile"
              value={milkmanDetails.milk_man_mobile}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 input-group">
            <label className="form-label me-3">Cow Milk Rate:</label>
            <input
              type="number"
              name="cow_milk_rate"
              value={milkmanDetails.cow_milk_rate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 input-group">
            <label className="form-label me-3">Buffalo Milk Rate:</label>
            <input
              type="number"
              name="buffalo_milk_rate"
              value={milkmanDetails.buffalo_milk_rate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button className="btn btn-primary me-3" type="submit">Add Milkman</button>
          <button className="btn btn-secondary" type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default MilkmanModal;
