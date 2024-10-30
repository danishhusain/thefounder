const mongoose = require('mongoose');
const { UtilityModel } = require('../../models/utility');


exports.getRole = async (req, res) => {
    try {
        // const utilityData = await mongoose.connection.collection('utilities').find({ role: 'role' });

        const utilityData = await UtilityModel.find({ type: 'role' });


        res.json(utilityData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};
exports.getEmploymentType = async (req, res) => {
    try {
        // const utilityData = await mongoose.connection.collection('utilities').find({ role: 'role' });
        const utilityData = await UtilityModel.find({ type: 'employmentTypeData' });
        


        res.json(utilityData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};