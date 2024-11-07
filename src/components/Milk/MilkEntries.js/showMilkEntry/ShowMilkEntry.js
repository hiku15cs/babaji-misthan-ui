import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../API/MilkmanAPI";
import { deleteMilkEntry } from "../../../../API/MilkEntryAPI";
import "./showMilkEntry.css";

function ShowMilkEntry({trigger}) {
  const [milkEntries, setMilkEntries] = useState([]);
  const [milkMen, setMilkMen] = useState([]);
  const [selectedMilkMan, setSelectedMilkMan] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);

  //State to store calculated value
  const [buffaloMilk, setBuffaloMilk] = useState("");
  const [buffaloMilkCost, setBuffaloMilkCost] = useState("");
  const [cowMilk, setCowMilk] = useState("");
  const [cowMilkCost, setCowMilkCost] = useState("");
  const [totalAdv, setTotalAdv] = useState("");
  const [totalDue, setTotalDue] = useState("");

  // Fetch milk entries on component mount
  useEffect(() => {
    const fetchMilkEntries = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/api/milk-entry");
        setMilkEntries(response.data);
        setFilteredEntries(response.data); // Display all entries initially
      } catch (error) {
        console.error("Error fetching milk entries:", error);
      }
    };

    const fetchMilkMen = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/api/milk-men");
        setMilkMen(response.data);
      } catch (error) {
        console.error("Error fetching milkmen:", error);
      }
    };

    fetchMilkEntries();
    fetchMilkMen();
  }, [trigger]);

  // Filter entries based on selected milkman
  const handleMilkManChange = (e) => {
    const milkManId = e.target.value;
    setSelectedMilkMan(milkManId);

    if (milkManId === "") {
      // Show all entries if no milkman is selected
      setFilteredEntries(milkEntries);
    } else {
      // Filter entries by selected milkman ID
      const filtered = milkEntries.filter(
        (entry) => entry.milk_man_id === milkManId
      );
      setFilteredEntries(filtered);
    }
  };

  //update the calculation
  
  const milkCalculation=()=>{
    let buffalo_milk=0;
    let buffalo_milk_rate=0;
    let cow_milk=0;
    let cow_milk_rate=0;
    let total_adv=0;
    let total_due=0;
    
    filteredEntries.forEach(milkTransaction => {
      buffalo_milk+=milkTransaction.buffalo_milk;
      cow_milk+=milkTransaction.cow_milk;
      total_adv+=milkTransaction.advance_amount;
    });
    milkMen.forEach(milk_man=>{
      if(milk_man._id===selectedMilkMan){
        buffalo_milk_rate=milk_man.buffalo_milk_rate;
        cow_milk_rate=milk_man.cow_milk_rate;
      }
    })
    setBuffaloMilk(buffalo_milk);
    setCowMilk(cow_milk);
    setTotalAdv(total_adv);
    setBuffaloMilkCost(buffalo_milk*buffalo_milk_rate);
    setCowMilkCost(cow_milk*cow_milk_rate);
    total_due=((buffalo_milk*buffalo_milk_rate)+(cow_milk*cow_milk_rate)-total_adv);
    if(selectedMilkMan){
      setTotalDue(total_due);
    }else{
      setTotalDue("N/A");
    }
    
  }
  //calling calculation
  useEffect(()=>{
    milkCalculation(); // eslint-disable-next-line
  },[filteredEntries])

  // Delete milkman function
  const handleDelete = (id) => {
    deleteMilkEntry(id)
      .then(() => {
        //update milk entry state
        const updatedEntries = milkEntries.filter(
          (milkEntry) => milkEntry._id !== id
        );
        setMilkEntries(updatedEntries);
        // Update filteredEntries based on selected milkman
        if (selectedMilkMan === "") {
          // Show all entries if no milkman is selected
          setFilteredEntries(updatedEntries);
        } else {
          // Filter entries by selected milkman ID
          const filtered = updatedEntries.filter(
            (entry) => entry.milk_man_id === selectedMilkMan
          );
          setFilteredEntries(filtered);
        }
      })
      .catch((error) => console.error("Error deleting milkman:", error));
  };

  return (
    <div className="container p-4 m-3 show-milk-container">
      <h2 className="mb-4 text-primary">Milk Entries</h2>
      <div className="form-group mb-3 d-flex">
      <label>
        Filter by Milkman:</label>
        <select className="form-control w-25 ms-5" value={selectedMilkMan} onChange={handleMilkManChange}>
          <option value="">-- Show All --</option>
          {milkMen.map((milkMan) => (
            <option key={milkMan._id} value={milkMan._id}>
              {milkMan.milk_man_name}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>Milkman Name</th>
            <th>Buffalo Milk (liters)</th>
            <th>Cow Milk (liters)</th>
            <th>Advance Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => {
            const milkman = milkMen.find(
              (man) => man._id === entry.milk_man_id
            );
            return (
              <tr key={entry._id}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{milkman ? milkman.milk_man_name : "Unknown"}</td>
                <td>{entry.buffalo_milk}</td>
                <td>{entry.cow_milk}</td>
                <td>{entry.advance_amount}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDelete(entry._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="cal">
            <td></td>
            <td></td>
            <td>Buffalo Milk: {buffaloMilk}</td>
            <td>Cow Milk: {cowMilk}</td>
            <td>Total Adv: {totalAdv}</td>
          </tr>
          <tr className="cal">
            <td></td>
            <td></td>
            <td>Cost on Buffalo Milk: {buffaloMilkCost}</td>
            <td>Cost on Cow Milk: {cowMilkCost}</td>
            <td>Total Due: {totalDue}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ShowMilkEntry;
