const Holiday = require('../../models/holiday');

// Create a new holiday
exports.createHoliday = async (req, res) => {
    try {
        const { companyId, name, startDate, endDate, numberOfDays, types, description } = req.body;
        // console.log("first",)

        const holiday = new Holiday({
            companyId,
            name,
            startDate,
            endDate,
            numberOfDays,
            types,
            description
        });
        const savedHoliday = await holiday.save();
        res.status(201).json(savedHoliday);
    } catch (error) {
        console.error("Error creating holiday:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all holidays
exports.getAllHolidays = async (req, res) => {
    try {
        const holidays = await Holiday.find();
        res.status(200).json(holidays);
    } catch (error) {
        console.error("Error fetching holidays:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a holiday by ID
exports.getHolidayById = async (req, res) => {
    const { companyId } = req.params;
    try {
        const holiday = await Holiday.find({companyId:companyId});
        if (!holiday) {
            return res.status(404).json({ message: 'Holiday not found' });
        }
        res.status(200).json(holiday);
    } catch (error) {
        console.error("Error fetching holiday:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a holiday
exports.updateHoliday = async (req, res) => {
    try {
        const { companyId, name, startDate, endDate, numberOfDays, types, description } = req.body;
        const updatedHoliday = await Holiday.findOneAndUpdate({ companyId: companyId }, { name, startDate, endDate, numberOfDays, types, description }, { new: true });
        if (!updatedHoliday) {
            return res.status(404).json({ message: 'Holiday not found' });
        }
        res.status(200).json(updatedHoliday);
    } catch (error) {
        console.error("Error updating holiday:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a holiday
exports.deleteHoliday = async (req, res) => {
    const { companyId } = req.params
    try {
        const deletedHoliday = await Holiday.findOneAndDelete({ companyId: companyId });
        if (!deletedHoliday) {
            return res.status(404).json({ message: 'Holiday not found' });
        }
        res.status(200).json({ message: 'Holiday deleted successfully' });
    } catch (error) {
        console.error("Error deleting holiday:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
