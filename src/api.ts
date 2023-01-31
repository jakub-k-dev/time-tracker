import axios from "axios";

const baseURL = "https://63d827c55a330a6ae16453a4.mockapi.io/timetracker";

export const api = axios.create({
  baseURL,
  timeout: 5000,
});
