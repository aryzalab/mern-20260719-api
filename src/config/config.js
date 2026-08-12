import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 9000,
};

export default config;
