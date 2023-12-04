import express from "express";
<<<<<<< Updated upstream
import {login,logout, changePassword, resetPassword, verifyOTP, searchMedicine,getMedicines, createMedicine, createPharmacist, deletePharmacist, fetchPharmacist, viewMedicineQS, addMedicine, editMedicineIandP } from "../controllers/pharmacistController.js";
import { requireAuth } from "../Middleware/authMiddleware.js";
=======
import { searchMedicine,getMedicines, fetchPendingDoctor, acceptPharmacist, createMedicine, createPharmacist, deletePharmacist, fetchPharmacist, viewMedicineQS, addMedicine, editMedicineIandP } from "../controllers/pharmacistController.js";
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
router.post('/login',login);
router.get('/logout',logout)
=======
router.patch('/acceptPharmacist', acceptPharmacist);
>>>>>>> Stashed changes

router.put('/changePassword', changePassword);

router.post('/resetPassword', resetPassword);

router.post('/verifyOTP', verifyOTP);

router.delete('/', deletePharmacist);

//req.13
router.get('/viewMedicineQS', viewMedicineQS);

//req. 16
router.post('/addMedicine', addMedicine);

//req. 18
router.patch('/editMedicineIandP', editMedicineIandP);


export default router