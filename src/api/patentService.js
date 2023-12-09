import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

const patentService = {
  submitPatent: async (patentData) => {
    try {
      const response = await axios.post(`${BASE_URL}/patent-submissions`, patentData);
      return response.data;
    } catch (error) {
      // In a production environment, you might want to handle this error
      // more gracefully and perhaps use a logging service.
      console.error('Error submitting patent:', error);
      throw error;
    }
  },
};

export default patentService;
