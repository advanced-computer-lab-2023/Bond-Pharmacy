import doctorModel from "../models/pharmacistModel.js";
import medicineModel from "../models/medicineModel.js"
import multer from "multer";

import jwt from "jsonwebtoken"
import passwordValidator from 'password-validator';

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8) // Minimum length 8
.is().max(16) // Maximum length 16
.has().uppercase() // Must have uppercase letters
.has().lowercase() // Must have lowercase letters
.has().digits() // Must have at least  digits
.has().not().spaces(); // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// generate random OTP
import crypto from 'crypto';
// const crypto = require('crypto');
function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

// Using a gmail
import nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'csen704Bond@gmail.com',
    pass: 'xsfudgbrdfpzkihi',
  },
});

// Sending OTP
async function sendOTP(email, otp) {
  const mailOptions = {
    from: 'csen704Bond@gmail.com',
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// create json web token after login
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username,role) => {
    return jwt.sign({ username,role }, 'supersecret', {
        expiresIn: maxAge
    });
};

// create json web token after reset
const createResetToken = (username, otp) => {
  return jwt.sign({username, otp}, 'supersecret', {
    expiresIn: maxAge
  });
};

export const login = async(req,res) => {

  try {
    const { username, password } = req.body;
  const pharmacist = await doctorModel.findOne({username:username});
  if (!pharmacist){
    return res.status(400).json({error : "Pharmacist Doesn't Exist"});
  }

  if(pharmacist.password !== password){
    return res.status(400).json({error : "Incorrect Password"});
  }

  const token = createToken(username,"pharmacist");
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000,sameSite: "none", secure: true });
  res.set('Access-Control-Allow-Origin',req.headers.origin);
  res.set('Access-Control-Allow-Credentials','true');


  res.status(200).json(pharmacist);
  //res.redirect('/admin/home');
  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}

export const resetPassword = async(req,res) => {
  try {
    const { username, email } = req.body;
    const pharmacist = await doctorModel.findOne({username:username});
    if(!pharmacist) {
      return res.status(400).json({error : "Pharmacist Doesn't Exist"});
    }
    if(pharmacist.email !== email) {
      return res.status(400).json({error : "Email Doesn't Match"});
    }

    const otp = generateOTP();
    sendOTP(email, otp);

    const token = createResetToken(username,otp);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000,sameSite: "none", secure: true });
    res.set('Access-Control-Allow-Origin',req.headers.origin);
    res.set('Access-Control-Allow-Credentials','true');
  
    res.json({ message: 'OTP sent successfully' });

  } catch (error) {
    return res.status(400).json({error : error.message});
  }
}

export const verifyOTP = async(req, res) => {
  try {
    const token = req.cookies.jwt;

    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You have not reset your password"});
      } else {
        const savedUsername = decodedToken.username ;
        const savedOTP  = decodedToken.otp ;

        const {OTP, username, newPassword, reNewPassword} = req.body;
        if(username !== savedUsername) {
          res.status(400).json({message:"You have not reset your password"});
        }

        const pharmacist = await doctorModel.findOne({username:username});
       
        if (!pharmacist){
          return res.status(400).json({error : "Pharmacist Doesn't Exist"});
        }
        if(OTP !== savedOTP) {
          return res.status(400).json({error : "Wrong OTP"});
        }
        if(newPassword !== reNewPassword) {
          return res.status(400).json({error : "New Password and Re-input New Password does not match"});
        }
        if (!schema.validate(newPassword)) {
          let tempArr = schema.validate(newPassword, { details: true });
          const tempJson = tempArr.map(detail => ({
            validation : detail.validation,
            message : detail.message
          }));
          return res.status(400).json(tempJson);
        }
        pharmacist.password = newPassword;
        await pharmacist.save();

        res.status(200).json({ message: "Password resetted successfully" });        
      }
    });
  } catch (error) {
    return res.status(400).json({error : error.message});
  }
};

export const changePassword = async(req,res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const username = decodedToken.username ;
        const role  = decodedToken.role;

        const { oldPassword, newPassword, reNewPassword } = req.body;
        const pharmacist = await doctorModel.findOne({username:username});

        if (!pharmacist){
          return res.status(400).json({error : "Pharmacist Doesn't Exist"});
        }
        if(pharmacist.password !== oldPassword) {
          return res.status(400).json({error : "Wrong Password"});
        }
        if(newPassword !== reNewPassword) {
          return res.status(400).json({error : "New Password and Re-input New Password does not match"});
        }

        if (!schema.validate(newPassword)) {
          let tempArr = schema.validate(newPassword, { details: true });
          const tempJson = tempArr.map(detail => ({
            validation : detail.validation,
            message : detail.message
          }));
          return res.status(400).json(tempJson);
        }
        pharmacist.password = newPassword;
        await pharmacist.save();
  
        res.status(200).json({ message: "Password updated successfully" });        
      }
    });
  } catch (error) {
    return res.status(400).json({error : error.message});
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/"); //store uploaded documents
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
export const createPharmacist = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dob,
    gender,
    phoneNumber,
    hourlyRate,
    affiliation,
    educationBg
  } = req.body;
  
 // Handle file uploads for documents
//  upload.fields([
//   { name: "idDocument", maxCount: 1 },
//   { name: "pharmacyDegreeDocument", maxCount: 1 },
//   { name: "workingLicenseDocument", maxCount: 1 },
// ])(req, res, async (err) => {
//   if (err) {
//       return res.status(400).json({ error: "File upload error." });
//   }

//   // Get file paths from the uploaded documents
//   const idDocument = req.files["idDocument"][0].path;
//   const pharmacyDegreeDocument = req.files["pharmacyDegreeDocument"][0].path;
//   const workingLicenseDocument = req.files["workingLicenseDocument"][0].path;

  try {
    const doctor = await pharmacistModel.create({
      username,
      name,
      email,
      password,
      dob,
      gender,
      phoneNumber,
      hourlyRate,
      affiliation,
      educationBg,
      // idDocument,
      // pharmacyDegreeDocument,
      // workingLicenseDocument,
    });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// req.16 , add medicine 
export const addMedicine = async (req, res) => {
  const { name , ingredients , price , quantity } = req.body;
  if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
  }
  try{const medicine = await medicineModel.findOne({ name });
  if (medicine) {
      const newQuantity = parseInt(medicine.quantity) + parseInt(quantity);
      await medicineModel.findOneAndUpdate({ name }, { quantity: newQuantity }, { new: true });
      return res.status(200).json({ message: "Medicine quantity updated  successfully" });
  }else if(!medicine && (!ingredients || !price )){
      return res.status(400).json({ message: "since you are adding a medicine that does not exist in the database you must provide ingredients and price" });
  }else{
      const newMedicine = new medicineModel({ name , ingredients , price , quantity });
      await newMedicine.save();
      return res.status(200).json({ message: "Medicine added successfully" });
  }}
  catch(err){
      return res.status(500).json({ message: err.message });
  }
}

// req. 13 , view only the availabe quantity and sales of each medicine
export const viewMedicineQS = async (req, res) => {
  try{const medicine = await medicineModel.find();
      const medicineQS = medicine.map(medicine => ({ name: medicine.name, quantity: medicine.quantity, sales: medicine.sales }));
      return res.status(200).json({ medicineQS });}
      catch(err){
          return res.status(500).json({ message: err.message });
      }
}

// req. 18 , edit medicine details(active ingredients) and price
export const editMedicineIandP = async (req, res) => {
  const { name , ingredients , price } = req.body;
  try{const medicine = await medicineModel.findOne({ name });
  if (medicine) {
      await medicineModel.findOneAndUpdate({ name }, { ingredients , price }, { new: true });
      return res.status(200).json({ message: "Medicine ingredients and price updated successfully" });
  }else{
      return res.status(400).json({ message: "Medicine does not exist in the database" });
  }}
  catch(err){
      return res.status(500).json({ message: err.message });
  }
}

//taha’s extra trial function
export const createMedicine = async (req, res) => {
  const {
    medicineName,
    medicinePrice,
    medicineIngredients,
    medicineQuantity,
    medicineImage
  } = req.body;
  try {
    const medicine = await medicineModel.create({
      name: medicineName,
      price: medicinePrice,
      ingredients: medicineIngredients,
      quantity: medicineQuantity,
      image: medicineImage
    });
    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMedicines = async (req, res) => {
  try {
    const medicines = await medicineModel.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export const fetchPharmacist = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export const deletePharmacist = async (req, res) => {
  const { username } = req.body;

  try {
    const deletedUser = await doctorModel.findOneAndDelete({ username });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Define an asynchronous function to search for medicines based on a provided name
export const searchMedicine = async (req, res) => {
  // Extract the 'name' parameter from the query string of the request
  const { name } = req.query;

  try {
    // Log the search 'name' to the console for debugging purposes
    console.log("name:", String(name));

    // Search for medicines in the database that match the provided 'name' using a case-insensitive regex
    const medicines = await medicineModel.find({ name: { $regex: name, $options: 'i' }});

    // If no medicines are found, return a 404 Not Found response
    if (medicines.length === 0) {
      return res.status(404).json({ message: 'No medicines found.' });
    }

    // If medicines are found, return a 200 OK response with the list of medicines
    res.status(200).json(medicines);
  } catch (err) {
    // If an error occurs during the search, log the error to the console
    console.error(err);
    
    // Return a 500 Internal Server Error response to indicate a server error
    res.status(500).json({ message: err.message });
  }
};






