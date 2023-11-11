//const jwt = require('jsonwebtoken');
import adminModel from "../models/adminModel.js";
import pharmacistModel from "../models/pharmacistModel.js";
import patientModel from "../models/patientModel.js";

import jwt from "jsonwebtoken"


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username,role) => {
    return jwt.sign({ username,role }, 'supersecret', {
        expiresIn: maxAge
    });
};

export const login = async(req,res) => {

  try {
    const { username, password } = req.body;
  const admin = await adminModel.findOne({username:username});
  if (!admin){
    return res.status(400).json({error : "Admin Doesn't Exist"});
  }

  if(admin.password !== password){
    return res.status(400).json({error : "Incorrect Password"});
  }

  const token = createToken(username,"admin");
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000,sameSite: "none", secure: true });
  res.set('Access-Control-Allow-Origin',req.headers.origin);
  res.set('Access-Control-Allow-Credentials','true');


  res.status(200).json(admin);
  //res.redirect('/admin/home');
  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}


export const createAdmin = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  try {
    const admin = await adminModel.create({
      username,
      password
    });


    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const deleteAdmin = async (req, res) => {
  const{username}=req.body;
  try {
    const deletedUser = await adminModel.findOneAndDelete({ username});
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
}

export const viewpharmacist =  async (req, res) => {
  try {
    const pharmacist = await pharmacistModel.find();
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

/*export const viewallpatients =  async (req, res) => {
  try {
    const patient = await patientModel.find();
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
}*/

export const viewpatient =  async (req, res) => {
  const{username}=req.params;  
  try {
    const patient = await patientModel.findOne({ username });
    if(!patient){
      return res.status(400).json({error: "Patient Not Found"})
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
}
export const acceptOrRejectPharmacistRequest = async (req, res) => {
  const { username, status } = req.body;

  try {
    const pharmacist = await pharmacistModel.findOne({ username });

    if (!pharmacist) {
      return res.status(404).json({ error: "Pharmacist not found" });
    }

    pharmacist.status = status; // 'status' can be 'accepted' or 'rejected'
    await pharmacist.save();

    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};