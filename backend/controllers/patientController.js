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