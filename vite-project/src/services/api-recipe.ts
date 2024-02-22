import axios from "axios";

export default axios.create({
  // baseURL: "https://65d32f0b522627d50108373a.mockapi.io/",
  baseURL: "http://localhost:3000"
  // headers: { "content-type": "application/json" },
});
