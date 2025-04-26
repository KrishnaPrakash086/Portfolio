import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  return response.data.token;
};

export const getContent = async () => {
  return (await axios.get(`${API_URL}/content`)).data;
};

export const addContent = async (type, data, token) => {
  return (
    await axios.post(
      `${API_URL}/content`,
      { type, data },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  ).data;
};

export const deleteContent = async (id, token) => {
  return (
    await axios.delete(`${API_URL}/content/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};
