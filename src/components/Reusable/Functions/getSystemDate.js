// Function to get today's date in YYYY-MM-DD format
export const getSystemDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };
  