import pharmacistModel from "../models/pharmacistModel.js";


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
      educationBg
    });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const fetchPharmacist = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
}

  export const deletePharmacist = async (req, res) => {
    const{username}=req.body;

    try {
      const deletedUser = await doctorModel.findOneAndDelete({username});
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }


