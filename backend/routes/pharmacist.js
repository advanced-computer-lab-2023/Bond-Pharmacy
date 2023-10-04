import express from "express";
import { createPharmacist , deletePharmacist, fetchPharmacist } from "../controllers/pharmacistController.js";

//router initialization
const router = express.Router();

router.get('/',fetchPharmacist);

router.post('/',createPharmacist);

router.delete('/',deletePharmacist);

export default router