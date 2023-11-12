import express, { json } from "express";
import { login,logout, changePassword, resetPassword, verifyOTP, createPatient,deletePatient, fetchPatient } from "../controllers/patientController.js";

//router initialization
const router = express.Router();

//get request
router.get("/", fetchPatient);

//post request
router.post("/", createPatient);

//delete request
router.delete('/',deletePatient);

router.post('/login',login);
router.get('/logout',logout)

router.put('/changePassword', changePassword);

router.post('/resetPassword', resetPassword);

router.post('/verifyOTP', verifyOTP);

export default router;
