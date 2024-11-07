import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5001';

// Fetch all milkman data
export const fetchMilkMen = async () => {
   try {
      const response = await axios.get(API_BASE_URL+"/api/milk-men");
      return response.data;
   } catch (error) {
      console.error('Error fetching milkmen:', error);
      throw error;
   }
};

// Function to add a new milkman
export const addMilkman = async (milkmanDetails) => {
   try {
       const response = await axios.post(`${API_BASE_URL}/api/milk-men/add`, milkmanDetails);
       return response.data; // Return the response data
   } catch (error) {
       throw error; // Rethrow the error for handling in the component
   }
};

// Edit milkman data
export const editMilkMan = async (id, updatedData) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/api/milk-men/edit`, { id, ...updatedData });
      return response.data;
   } catch (error) {
      console.error('Error editing milkman:', error);
      throw error;
   }
};

// Delete milkman data
export const deleteMilkMan = async (id) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/api/milk-men/delete`, { id });
      return response.data;
   } catch (error) {
      console.error('Error deleting milkman:', error);
      throw error;
   }
};
