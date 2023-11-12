import patientModel from "../models/patientModel.js";
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
  const patient = await patientModel.findOne({username:username});
  if (!patient){
    return res.status(400).json({error : "Patient Doesn't Exist"});
  }

  if(patient.password !== password){
    return res.status(400).json({error : "Incorrect Password"});
  }

  const token = createToken(username,"patient");
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000,sameSite: "none", secure: true });
  res.set('Access-Control-Allow-Origin',req.headers.origin);
  res.set('Access-Control-Allow-Credentials','true');


  res.status(200).json(patient);
  //res.redirect('/admin/home');
  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}


export const logout = async (req, res) => {
  
  try {
    const token = req.cookies.jwt;
    if (!token){
        res.status(400).json({error:"You're Not Signed in to Logout !!"})
         } else {
           res.clearCookie('jwt');
           res.status(200).json({mssg : "Successfully Logged Out "});}
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

export const resetPassword = async(req,res) => {
  try {
    const { username, email } = req.body;
    const patient = await patientModel.findOne({username:username});
    if(!patient) {
      return res.status(400).json({error : "Patient Doesn't Exist"});
    }
    if(patient.email !== email) {
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

        const patient = await patientModel.findOne({username:username});
       
        if (!patient){
          return res.status(400).json({error : "Patient Doesn't Exist"});
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
        patient.password = newPassword;
        await patient.save();

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
        const patient = await patientModel.findOne({username:username});

        if (!patient){
          return res.status(400).json({error : "Patient Doesn't Exist"});
        }
        if(patient.password !== oldPassword) {
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
        patient.password = newPassword;
        await patient.save();
  
        res.status(200).json({ message: "Password updated successfully" });        
      }
    });
  } catch (error) {
    return res.status(400).json({error : error.message});
  }
}

// create a new patient
export const createPatient = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dob,
    gender,
    phoneNumber,
    emergencyFullName,
    emergencyPhoneNumber,
  } = req.body;
  try {
    const patient = await patientModel.create({
      username,
      name,
      email,
      password,
      dob,
      gender,
      phoneNumber,
      emergencyFullName,
      emergencyPhoneNumber,
    });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchPatient = async (req, res) => {
  try {
    const doctors = await patientModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
};

export const deletePatient = async (req, res) => {
  const{username}=req.body;
  
  try {
    const deletedUser = await patientModel.findOneAndDelete({ username });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
};