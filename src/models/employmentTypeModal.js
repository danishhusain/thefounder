const mongoose = require('mongoose');

const employmentTypeSchema = new mongoose.Schema({
  typeName: {
    type: [String],
    // required: true,
    default: ['Full-Time', 'Part-Time', 'Contractual/Temporary', 'Freelance/Consultant', 'Internship'], 
  },
});

module.exports = mongoose.model('EmploymentType', employmentTypeSchema);
