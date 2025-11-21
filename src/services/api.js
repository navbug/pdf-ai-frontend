import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const validateDocument = async (pdfFile, rules) => {
  try {
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('rule1', rules.rule1);
    formData.append('rule2', rules.rule2);
    formData.append('rule3', rules.rule3);

    const response = await axios.post(`${API_BASE_URL}/validate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, 
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // No response received
      throw new Error('No response from server. Please check if backend is running.');
    } else {
      // Request setup error
      throw new Error(error.message || 'Failed to send request');
    }
  }
};

export const checkServerHealth = async () => {
  try {
    const response = await axios.get('http://localhost:5000/health', {
      timeout: 5000
    });
    return response.data.status === 'ok';
  } catch (error) {
    return false;
  }
};