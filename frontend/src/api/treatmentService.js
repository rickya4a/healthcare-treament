import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const createTreatment = async (treatmentData) => {
  try {
    const response = await axios.post(`${API_URL}/treatment`, treatmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating treatment:', error);
    throw error;
  }
};