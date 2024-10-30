// const mongoose = require('mongoose');

// const utilitySchema = new mongoose.Schema({
//     companyId: {
//         type: String,
//         required: true,
//     },
//     data: {
//         type: Map,
//         of: mongoose.Schema.Types.Mixed,
//     },
// });

// exports.UtilityModel = mongoose.model('Utility', utilitySchema);



////
const mongoose = require('mongoose');

const utilitySchema = new mongoose.Schema({
    role: {
        type: String,
    },
    roleData: {
        type: String,
    },
    employmentTypeData: {
        type: String,
    },


});




exports.UtilityModel = mongoose.model('Utility', utilitySchema);

