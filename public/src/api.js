import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getContent = async () => {
  return (await axios.get(`${API_URL}/content`)).data;
};
