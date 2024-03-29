import express from "express";
import patientRoutes from "./routes/patient.js";
import pharmacistRoutes from "./routes/pharmacist.js";
import adminRoutes from "./routes/admin.js"
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

//initializations
dotenv.config();
const app = express();

//.env
const port = process.env.PORT || 4000; // Default to port 4000 if the environment variable is not set
const mongo = process.env.MONGO_URI;
//middleware
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000',credentials:true}));
app.use(cookieParser())

//routes
app.use("/api/patient/", patientRoutes);
app.use("/api/pharmacist/", pharmacistRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/user/", userRoutes);

//connect to db
mongoose
  .connect(mongo)
  .then(() => {
    // listen for requests
    app.listen(port, () => console.log(`Connected to MongoDB and Server is running on port 4000`));
  })
  .catch((error) => {
    console.log(error);
  });

