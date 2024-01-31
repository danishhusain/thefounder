
const employmentTypeModal = require("../../models/employmentTypeModal");

exports.createDefault = async (req, res) => {
    try {
        const newEmploymentType = await employmentTypeModal.create({
            type: ['Full-Time', 'Part-Time', 'Contractual/Temporary', 'Freelance/Consultant', 'Internship'],
        });

        res.status(201).json(newEmploymentType);
    } catch (error) {
        console.error('Error creating default employment type:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



exports.getAll = async (req, res) => {
    try {
        // Retrieve all employment types
        const employmentTypes = await employmentTypeModal.findOne();
        // console.log(employmentTypes)
        const data = ['Full-Time', 'Part-Time', 'Contractual/Temporary', 'Freelance/Consultant', 'Internship']

        res.json({ status: true, message: "employment types data fetched", data });
    } catch (error) {
        console.error('Error fetching employment types:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

