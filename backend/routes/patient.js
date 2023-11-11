import express, { json } from "express";
import { login,createPatient,deletePatient, fetchPatient } from "../controllers/patientController.js";

//router initialization
const router = express.Router();

//get request
router.get("/", fetchPatient);

//post request
router.post("/", createPatient);

//delete request
router.delete('/',deletePatient);

router.post('/login',login);
export default router;
