import express from "express";
import { createAdmin, deleteAdmin, viewpatient, viewpharmacist,  } from "../controllers/adminController.js";

//router initialization
const router = express.Router();

router.get('/pharmacists', viewpharmacist);
router.get('/viewpatient/:username', viewpatient);
router.post('/',createAdmin);
router.delete('/',deleteAdmin);

export default router