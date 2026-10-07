import dotenv from "dotenv";

dotenv.config();

const config = {
  appUrl: process.env.APP_URL || "",
  apiUrl: process.env.API_URL || "",
  port: process.env.PORT || 9000,
  mongodbUrl: process.env.MONGODB_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
  resendApiKey: process.env.RESEND_API_KEY || "",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  khalti: {
    apiUrl: process.env.KHALTI_API_URL || "",
    secretKey: process.env.KHALTI_SECRET_KEY || "",
    returnUrl: process.env.KHALTI_RETURN_URL || "",
  },
};

export default config;
