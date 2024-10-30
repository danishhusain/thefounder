const mongoose = require('mongoose');

const weekendSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
    },
    dayNames: [{ type: String, enum: ['Sunday', 'Saturday'], required: true }],
    days: {
        type: Number,
        validate: {
            validator: function (v) {
                return v >= 1 && v <= 2;
            },
            message: props => `${props.value} is not a valid day number. It should be either 1 or 2.`
        },
        required: true
    }
});

const Weekend = mongoose.model('Weekend', weekendSchema);

module.exports = Weekend;
