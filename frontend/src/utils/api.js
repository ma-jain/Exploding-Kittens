import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api';

export const getCard = async () => {
  const response = await axios.get(`${BASE_URL}/get-card`);
  return response.data.card;
};

export const createUsername = async (username) => {
  const response = await axios.get(`${BASE_URL}/username?username=${username}`);
  return response.data;
};

export const updateScore = async (username) => {
  const response = await axios.post(`${BASE_URL}/update-score?username=${username}`);
  return response.data;
};

export const getLeaderboard = async () => {
  const response = await axios.get(`${BASE_URL}/leaderboard`);
  return response.data;
};