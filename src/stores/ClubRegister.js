import axios from 'axios';

const submitForm = async (formData) => {
  try {
    const response = await axios.post('http://localhost:8080/courtmaster/api/test/register-club', formData);
    console.log('Club registered successfully:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error registering club:', error);
    return { success: false, error: error.message };
  }
};

export { submitForm };