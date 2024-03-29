import express from "express";
import { login,logout, changePassword, resetPassword, verifyOTP, createAdmin, deleteAdmin, viewpatient, viewpharmacist, acceptOrRejectPharmacistRequest  } from "../controllers/adminController.js";

//router initialization
const router = express.Router();

router.get('/pharmacists', viewpharmacist);
router.get('/viewpatient/:username', viewpatient);
router.post('/',createAdmin);
router.delete('/',deleteAdmin);
router.post('/login',login);
router.get('/logout',logout)
router.put('/changePassword', changePassword);
router.post('/resetPassword', resetPassword);
router.post('/verifyOTP', verifyOTP);

//8
router.post('/', acceptOrRejectPharmacistRequest);

export default router