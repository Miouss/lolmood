export const API_HOST =
  process.env.NODE_ENV === "production"
    ? "https://lolmood.net/api"
    : "http://localhost:3001/api";
