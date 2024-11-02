import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  apiKey: process.env.CURRENCY_API_KEY,
  baseUrl: "https://api.freecurrencyapi.com/v1",
};