import axios from "axios";
import { API_BASE_URL } from "./MilkmanAPI";

export const addMilkEntry = async (entryData) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/milk-entry/add",
      entryData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding milk entry:", error);
    throw error;
  }
};

// Delete milk Entry data
export const deleteMilkEntry = async (milk_man_id) => {
  try {
     const response = await axios.post(`${API_BASE_URL}/api/milk-entry/delete`, { milk_man_id });
     return response.data;
  } catch (error) {
     console.error('Error deleting milk Entry:', error);
     throw error;
  }
};