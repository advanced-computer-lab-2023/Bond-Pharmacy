import express from "express";
import {login, searchMedicine,getMedicines, createMedicine, createPharmacist, deletePharmacist, fetchPharmacist, viewMedicineQS, addMedicine, editMedicineIandP } from "../controllers/pharmacistController.js";
import { requireAuth } from "../Middleware/authMiddleware.js";

//router initialization
const router = express.Router();

router.get('/', fetchPharmacist);

router.post('/', createPharmacist);

router.post('/createPharmacist', createPharmacist);

//9
router.post('/register', createPharmacist);

router.post('/createMedicine', createMedicine);

router.get('/getMedicines', getMedicines);

router.get('/searchMedicines',requireAuth,searchMedicine);

router.post('/login',login);

router.delete('/', deletePharmacist);

//req.13
router.get('/viewMedicineQS', viewMedicineQS);

//req. 16
router.post('/addMedicine', addMedicine);

//req. 18
router.patch('/editMedicineIandP', editMedicineIandP);


export default router