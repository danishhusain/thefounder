const mongoose = require('mongoose');

const utilitySchema = new mongoose.Schema({
    data: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
    },
});

exports.UtilityModel = mongoose.model('Utility', utilitySchema);
