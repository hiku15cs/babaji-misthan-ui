import React, { useContext, useEffect, useState } from "react";
import {
  fetchMilkMen,
  editMilkMan,
  deleteMilkMan,
} from "../../../API/MilkmanAPI";
import MilkmanModal from "./MilkmanModal";
import { BabaJiMisthanContext } from "../../../Context/GlobalContextProvider";

function MilkMen() {
  const [milkMen, setMilkMen] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {loading} = useContext(BabaJiMisthanContext);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fetch milkman data on component load
  useEffect(() => {
    fetchMilkMen()
      .then((data) => setMilkMen(data))
      .catch((error) => console.error("Error fetching milkmen:", error));
  }, []);

  // Delete milkman function
  const handleDelete = (id) => {
    deleteMilkMan(id)
      .then(() => {
        setMilkMen(milkMen.filter((milkMan) => milkMan._id !== id));
      })
      .catch((error) => console.error("Error deleting milkman:", error));
  };

  // Edit milkman function (example)
  const handleEdit = (id, updatedData) => {
    editMilkMan(id, updatedData)
      .then(() => {
        setMilkMen(
          milkMen.map((milkMan) =>
            milkMan._id === id ? { ...milkMan, ...updatedData } : milkMan
          )
        );
      })
      .catch((error) => console.error("Error updating milkman:", error));
  };

  return (
    <div className="p-5">
      <h2>Milk Men Details</h2>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Buffalo Milk Rate</th>
              <th>Cow Milk Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {milkMen.map((milkMan) => (
              <tr key={milkMan._id}>
                <td>{milkMan.milk_man_name}</td>
                <td>{milkMan.milk_man_mobile}</td>
                <td>{milkMan.buffalo_milk_rate}</td>
                <td>{milkMan.cow_milk_rate}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEdit(milkMan._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDelete(milkMan._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          Add New Milk Person
        </button>
        <MilkmanModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          setMilkMen={setMilkMen}
        />
      </div>
    </div>
  );
}

export default MilkMen;
