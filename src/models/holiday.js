const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
    },
    companyId: {
        type: String,
        required: true,
    },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numberOfDays: { type: Number, required: true },
    types: {
        type: [{
            type: String,
            enum: ['National Holidays', 'Regional Holidays', 'Public Holidays', 'Gazetted Holidays', 'Festival Holidays', 'none'],
            required: true
        }],
        required: true
    },
    description: { type: String }
});

const Holiday = mongoose.model('Holiday', holidaySchema);

module.exports = Holiday;
