const { Employee } = require("../../models/employeeModel");
const { generateOTP, sendOtpViaEmail } = require("../../utils/authUtils");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



// controllers/createEmployee.js
exports.createEmployee = async (req, res) => {
  const companyId = req.headers['x-company-id'];

  const { email, branchId } = req.body
  try {
    const existingEmployee = await Employee.findOne({ companyId: companyId, branchId: branchId, email: email, });

    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// controllers/getAllEmployees.js
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// controllers/getEmployeeById.js
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.employeeId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// controllers/updateEmployee.js
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// controllers/deleteEmployee.js
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({ employeeId: req.params.employeeId });
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.employeeLoginWithEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email and password
    if (!email) {
      return res.status(400).json({ message: 'Email  are required' });
    }


    // Check if employee with the provided email exists
    const existingEmployee = await Employee.findOne({ email: email });

    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found with provided email' });
    }

    // Perform password validation (You may need to implement password hashing and validation logic)
    const otp = generateOTP();
    const message = "its register otp"

    // Send OTP via email
    await sendOtpViaEmail(email, otp, message);


    const employee = await Employee.findOneAndUpdate(
      // { email: email, 'emailVerification.isVerified': false },
      { email: email },
      {
        $set: {
          'emailVerification.otp': otp,
        },
      },
      { new: true }
    );


    // Return success response if login is successful
    res.status(200).json({ message: 'Login Otp send successful', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// controllers/verifyOtpForEmployee.js
exports.verifyOtpForEmployee = async (req, res) => {
  console.log(req.body)

  try {
    const { email, otp } = req.body;

    // Validate email and OTP
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Find the employee with the provided email
    const existingEmployee = await Employee.findOneAndUpdate(
      { email: email, 'emailVerification.otp': otp },
      {
        $set: {
          // 'emailVerification.otp': null,
          'emailVerification.isVerified': true,
        },
      },
      { new: true }
    );

    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found with provided email' });
    }

    // Verify OTP logic here (You may need to implement OTP validation logic)

    // If OTP verification is successful

    const token = jwt.sign({ employeeId: existingEmployee.employeeId }, process.env.TOKEN_KEY);

    existingEmployee.jwtToken = token
    existingEmployee.accountStatus = true

    // Save changes to the database
    await existingEmployee.save();


    // Return success response
    res.status(200).json({ message: 'User LogIn successfully', employee: existingEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }


};
