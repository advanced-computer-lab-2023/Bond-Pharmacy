import express from "express";
import { createAdmin, deleteAdmin, viewpharmacist } from "../controllers/adminController.js";

//router initialization
const router = express.Router();

router.get('/pharmacists', viewpharmacist);

router.post('/',createAdmin);

router.delete('/',deleteAdmin);

export default router