// Import the mongoose library
const mongoose = require('mongoose');
const crypto = require('crypto');


// Define a schema for Personal Details
const personalDetailsSchema = new mongoose.Schema({
   
    name: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    maritalStatus: {
        type: String,
    },

    contactInformation: {
        phone: String,
        alternatephone: String,
        email: {
            type: String,
            lowercase: true,
            trim: true,
        },
        homeAddress: String,
        currentAddress: String,
        // Add any other contact information fields as needed
    },
    // Add any other personal details fields as needed
}, { _id: false }); // Disable automatic generation of _id for subdocuments

// Define a schema for Professional Details
const professionalDetailsSchema = new mongoose.Schema({

    designation: {
        type: String,
        // required: true,
    },
    department: {
        type: String,
    },
    joiningDate: {
        type: Date,
        // required: true,
    },
    salary: {
        type: Number,
    },
    workLocation: {
        type: String,
    },
    skills: {
        type: [String],
    },
    certifications: {
        type: String,
    },
    performanceRating: {
        type: Number,
    },
    workSchedule: {
        type: String,
    },

    // Add any other professional details fields as needed
});

// Define a schema for Previous Roles
const previousRolesSchema = new mongoose.Schema({
    role: String,
    company: String,
    startDate: Date,
    endDate: Date,
    // Add any other fields related to previous roles
}, { _id: false }); // Disable automatic generation of _id for subdocuments

// Define a schema for Promotions
const promotionsSchema = new mongoose.Schema({
    promotionDate: Date,
    newDesignation: String,
    // Add any other fields related to promotions
}, { _id: false }); // Disable automatic generation of _id for subdocuments

// Define a schema for Transfers
const transfersSchema = new mongoose.Schema({
    transferDate: Date,
    newDepartment: String,
    // Add any other fields related to transfers
}, { _id: false }); // Disable automatic generation of _id for subdocuments



// Define a schema for Employment History
const employmentHistorySchema = new mongoose.Schema({
  
    previousRoles: {
        type: [previousRolesSchema],
        default: [],
    },
    promotions: {
        type: [promotionsSchema],
        default: [],
    },
    transfers: {
        type: [transfersSchema],
        default: [],
    },
});


// Create a main schema combining personal, professional, and employment details
const userInformationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: () => crypto.randomBytes(8).toString('hex')
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    companyId: {
        type: String,
        required: true,
    },
    personalDetails: personalDetailsSchema,
    professionalDetails: professionalDetailsSchema,
    employmentHistory: employmentHistorySchema,
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

// Create the 'employees' collection based on the schema
const UserInformation = mongoose.model('userInformation', userInformationSchema);

// Export the Employee model
module.exports = UserInformation;
