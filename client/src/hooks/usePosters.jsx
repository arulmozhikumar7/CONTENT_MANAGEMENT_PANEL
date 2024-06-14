import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const getPosters = async () => {
  try {
    const response = await axios.get(apiUrl + `/api/poster/`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deletePoster = async (id) => {
  try {
    const response = await axios.delete(apiUrl + `/api/poster/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addPoster = async (data) => {
  try {
    const response = await axios.post(apiUrl + "/api/poster", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getPosters, deletePoster, addPoster };
