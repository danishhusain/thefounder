// roleController.js

const roleModel = require("../../models/roleModel");

exports.createDefault = async (req, res) => {
    try {
        const newRole = await roleModel.create({
            type: ['superAdmin', 'admin', 'subAdmin', 'manager', 'employee'],
        });

        res.status(201).json(newRole);
    } catch (error) {
        console.error('Error creating default role:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getAll = async (req, res) => {
    try {
        const roles = await roleModel.find();
        res.json(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getAll = async (req, res) => {
    try {
        // Retrieve all employment types
        const roles = await roleModel.findOne();
        const data = ['superAdmin', 'admin', 'subAdmin', 'manager', 'employee']

        res.json({ status: true, message: "role data fetched", data });
    } catch (error) {
        console.error('Error fetching employment types:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
