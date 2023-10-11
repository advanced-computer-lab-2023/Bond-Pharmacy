import mongoose from "mongoose";
const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ingredients: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    sales: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: ""
    },
    medicalUse: {
        type: String,
        default: "",
        // i assumed here that the medical use can be described in 2 words maximum
        trim: true,
    },
    image: {
        //the string holds the url or the path to the image
        type: String,
        trim: true,
    }
});

export default mongoose.model('medicine', medicineSchema)