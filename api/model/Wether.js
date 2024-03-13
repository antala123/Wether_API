import mongoose from "mongoose";

const wetherSchema = new mongoose.Schema({
    title: { type: String, required: [true, "title is required..."] },
    body: { type: String, required: [true, "body data is required..."] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, "User already exists..."] },
    active: { type: Boolean, enum: ["true", "false"], default: true },
    geolocation: {
        latitude: { type: Number, required: [true, "latitude is required"] },
        longitude: { type: Number, required: [true, "longitude is required"] }
    }
}, { timestamps: true });

export default mongoose.model('wetherdata', wetherSchema);