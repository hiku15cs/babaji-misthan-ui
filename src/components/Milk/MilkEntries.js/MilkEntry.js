import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowMilkEntry from "./showMilkEntry/ShowMilkEntry";
import { API_BASE_URL } from "../../../API/MilkmanAPI";
import "./milkEntry.css";
import { getSystemDate } from "../../Reusable/Functions/getSystemDate";

function MilkEntry() {
  const [milkMen, setMilkMen] = useState([]);
  const [selectedMilkMan, setSelectedMilkMan] = useState("");
  const [date, setDate] = useState(getSystemDate());
  const [advance, setAdvance] = useState("");
  const [buffaloMilk, setBuffaloMilk] = useState("");
  const [cowMilk, setCowMilk] = useState("");
  const [triggerFlag, setTriggerFlag]=useState(false);//flag to re-render the showMilkEntry Component

  // Fetch the list of milkmen on component mount
  useEffect(() => {
    const fetchMilkMen = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/api/milk-men");
        setMilkMen(response.data);
      } catch (error) {
        console.error("Error fetching milkmen:", error);
      }
    };
    fetchMilkMen();
  }, []);

  // Submit handler to save the milk entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        milk_man_id: selectedMilkMan,
        date,
        advance_amount: parseFloat(advance),
        buffalo_milk: parseFloat(buffaloMilk),
        cow_milk: parseFloat(cowMilk),
      };
      const response = await axios.post(
        API_BASE_URL + "/api/milk-entry/add",
        payload
      );
      setTriggerFlag((prev) => !prev);
      console.log("Milk entry added:", response.data);
      alert("Milk entry added successfully!");
      setSelectedMilkMan("");
      setAdvance("");
      setCowMilk("");
      setBuffaloMilk("");
    } catch (error) {
      console.error("Error adding milk entry:", error);
      alert("Error adding milk entry");
    }
  };

  return (
    <div>
      <div className="container my-5">
        <form
          onSubmit={handleSubmit}
          className="milk-entry-form p-4 rounded shadow-sm bg-light"
        >
          <h4 className="mb-4 text-center text-primary">
            Add Daily Milk Entry
          </h4>
          <div className="form-group mb-3">
            <label>Select Milkman:</label>
            <select
              className="form-control"
              value={selectedMilkMan}
              onChange={(e) => setSelectedMilkMan(e.target.value)}
              required
            >
              <option value="">-- Select Milkman --</option>
              {milkMen?.map((milkMan) => (
                <option key={milkMan._id} value={milkMan._id}>
                  {milkMan.milk_man_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Date: </label>
            <input
              className="form-control"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Advance Amount:</label>
            <input
              className="form-control"
              type="number"
              value={advance}
              onChange={(e) => setAdvance(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Buffalo Milk (in liters):</label>
            <input
              className="form-control"
              type="number"
              value={buffaloMilk}
              onChange={(e) => setBuffaloMilk(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Cow Milk (in liters):</label>
            <input
              className="form-control"
              type="number"
              value={cowMilk}
              onChange={(e) => setCowMilk(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-50">
              Submit
            </button>
          </div>
        </form>
      </div>
      
        <ShowMilkEntry trigger={triggerFlag}/>
    </div>
  );
}

export default MilkEntry;
