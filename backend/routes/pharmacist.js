import express from "express";
import { getMedicines, createMedicine, createPharmacist, deletePharmacist, fetchPharmacist } from "../controllers/pharmacistController.js";

//router initialization
const router = express.Router();

router.get('/', fetchPharmacist);

router.post('/', createPharmacist);

router.post('/createPharmacist', createPharmacist);

router.post('/createMedicine', createMedicine);

router.get('/getMedicines', getMedicines);

router.delete('/', deletePharmacist);

export default router