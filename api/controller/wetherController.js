import Wether from "../model/Wether.js";


export const createwether = async (req, res, next) => {
    try {
        const { title, body, active, geolocation } = req.body;
        const createdBy = req.user._id;
        const createData = await Wether.create({
            title,
            body,
            createdBy,
            active,
            geolocation
        });

        res.status(201).json({ message: "Whether Data Created successfully...", createData });
    } catch (error) {
        return next(error.message || "User creation failed...");
    }
}

export const getAllwether = async (req, res, next) => {
    try {
        const allData = await Wether.find({ createdBy: req.user._id });
        res.status(200).json({ allData });
    } catch (error) {
        return next(error.message || "Wether Data Not Found...");
    }
}

export const Updatewether = async (req, res, next) => {
    try {
        const { title, body, active, geolocation } = req.body;
        const updateData = await Wether.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            { title, body, active, geolocation },
            { new: true }
        );
        if (!updateData) {
            return next("Wether Data Not Found...");
        }
        res.status(200).json({ message: "Whether Data Update successfully...", updateData });
    } catch (error) {
        return next(error.message || "Wether Data Not Found...");
    }
}

export const Deletewether = async (req, res, next) => {
    try {
        const deleteData = await Wether.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
        if (!deleteData) {
            return next("Wether Data Not Found");
        }
        res.status(200).json({ message: "Whether Data Deleted successfully...", Deletewether });
    } catch (error) {
        return next(error.message || "Wether Data Not Found...");
    }
}

