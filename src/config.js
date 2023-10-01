export const API_HOST =
  process.env.NODE_ENV === "production"
    ? "lolmood.net/api"
    : "localhost:3001/api";
