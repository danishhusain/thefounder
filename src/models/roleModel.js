// roleModel.js
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role: {
        type: [String],
        default: ['superAdmin', 'admin', 'subAdmin', 'manager', 'employee'],
        // required: true
    },
});

module.exports = mongoose.model('Role', roleSchema);

