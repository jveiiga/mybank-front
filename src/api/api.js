import axios from "axios";

// Instância do Axios com a URL base do backend
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;