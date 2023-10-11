import express from "express";
import { getMedicines, createMedicine, createPharmacist, deletePharmacist, fetchPharmacist, viewMedicineQS, addMedicine, editMedicineIandP } from "../controllers/pharmacistController.js";

//router initialization
const router = express.Router();

router.get('/', fetchPharmacist);

router.post('/', createPharmacist);

router.post('/createPharmacist', createPharmacist);

router.post('/createMedicine', createMedicine);

router.get('/getMedicines', getMedicines);

router.delete('/', deletePharmacist);

//req.13
router.get('/viewMedicineQS', viewMedicineQS);

//req. 16
router.post('/addMedicine', addMedicine);

//req. 18
router.patch('/editMedicineIandP', editMedicineIandP);

export default router