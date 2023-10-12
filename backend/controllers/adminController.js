import adminModel from "../models/adminModel.js";
import pharmacistModel from "../models/pharmacistModel.js";
import patientModel from "../models/patientModel.js";

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
    res.status(404).json({error: error.message});
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
