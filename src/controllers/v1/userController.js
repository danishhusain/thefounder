const { User, LoginHistory, LogoutHistory, } = require('../../models/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { generateOTP, sendOtpViaEmail, recordLoginHistory, recordLogoutHistory } = require('../../utils/authUtils');
dotenv.config();





//register
exports.register = async (req, res) => {
  const { email, userName, number, password, roles } = req.body;

  try {
    // Check if user with the provided email or userName already exists
    const checkUser = await User.findOne({ $or: [{ email: email }, { userName: userName }, { number: number }] })

    if (!checkUser) {
      const otp = generateOTP();
      const message = "its register otp"

      // Send OTP via email
      await sendOtpViaEmail(email, otp, message);

      // Hash the password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = {
        email: email,
        userName: userName,
        number: number,
        roles: roles,
        password: passwordHash,
        emailVerification: {
          otp: otp,
          isVerified: false,
        },
      };

      // Save the user to the database
      const user = await User.create(newUser);

      //delete if user not verified
      setTimeout(async () => {

        const isUserVerified = await User.findOne(
          {
            $or: [{ email: email }, { 'emailVerification.isVerified': true }]
          }
        );

        if (isUserVerified.emailVerification?.isVerified === false) {
          await User.findByIdAndDelete(user._id);
          // console.log(`User data with email ${user.email} deleted after 30 seconds.`);
        } else {
          console.log(`${isUserVerified.email} is verified`)
        }

      }, 30 * 1000); // Delay of 30 seconds (30 * 1000 milliseconds)


      res.status(201).json({
        status: true,
        message: 'Please verify Otp 30 seconds',
        data: user,
      });
    } else {
      res.status(403).json({ status: false, message: 'User already exists' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.emailOtpVerify = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email: email, 'emailVerification.otp': otp, 'emailVerification.isVerified': false },
      {
        $set: {
          // 'emailVerification.otp': null,
          'emailVerification.isVerified': true,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or OTP.', status: false, data: [] });
    }


    res.status(200).send({
      message: `Email verified, user data updated`,
      status: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};




// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user with the provided email exists
//     const user = await User.findOne({ email: email });

//     if (user) {
//       // Compare the provided password with the stored hashed password
//       const isPasswordValid = await bcrypt.compare(password, user.password);

//       if (isPasswordValid) {
//         // Generate a JWT token for authentication
//         const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);

//         // Record login event
//         user.loginHistory.push({ timestamp: Date.now(), ipAddress: req.ip });

//         // Store the token in the user object
//         user.token = token;

//         // await user.save();
//         // Send the JSON response to the client
//         res.status(200).json({
//           status: true,
//           message: 'Login successful',
//           data: user,
//         });
//       } else {
//         res.status(401).json({ status: false, message: 'Invalid password' });
//       }
//     } else {
//       res.status(404).json({ status: false, message: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).json({ status: false, message: 'Internal server error' });
//   }
// };


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with the provided email exists
    const user = await User.findOne({ email: email });

    if (user) {
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);

        // Record login event
        // user.loginHistory.push({ timestamp: Date.now(), ipAddress: req.ip });
        await recordLoginHistory(user._id, req.ip);


        // Store the token in the user object
        user.token = token;
        user.accountStatus = true


        // Save changes to the database
        await user.save();

        // Send the JSON response to the client
        res.status(200).json({
          status: true,
          message: 'Login successful',
          data: user,
        });
      } else {
        res.status(401).json({ status: false, message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ status: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ status: false, message: 'Internal server error', });
  }
};




exports.logout = async (req, res) => {
  try {
    const user = req.user; // Assuming you have middleware for user authentication

    if (user) {
      // Record logout event
      user.logoutHistory.push({ timestamp: Date.now() });
      await recordLogoutHistory(user._id);

      user.accountStatus = false
      user.token = null;

      await user.save();
      res.status(200).json({
        status: true,
        message: 'Logout successful',
      });
    } else {
      res.status(401).json({ status: false, message: 'User not authenticated' });
    }
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

// Get login and logout history for a user
exports.loginHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await LoginHistory.find({ userId: userId });

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    res.status(200).json({
      status: true,
      data: { userId, user },
    });
  } catch (error) {
    console.error('Error retrieving user history:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
}
// Get login and logout history for a user
exports.loginHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await LoginHistory.find({ userId: userId });

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }


    res.status(200).json({
      status: true,
      message: "Login History data fetched",
      data: user
    });
  } catch (error) {
    console.error('Error retrieving user history:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
}

// Get login and logout history for a user
exports.logoutHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await LoginHistory.find({ userId: userId });

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }


    res.status(200).json({
      status: true,
      message: "Logout History data fetched",
      data: user
    });
  } catch (error) {
    console.error('Error retrieving user history:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
}
















exports.testUser = async (req, res) => {

  console.log("testUser1", req.ip)
  try {
    res.status(201).json({
      message: 'testUser1',
      status: true,
      data: [req.user, req.ip]
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};









exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const authenticatedUserId = req.user._id; // Assuming you have a middleware for user authentication

    // Check if the user making the request is the same as the user being retrieved
    if (userId !== authenticatedUserId.toString()) {
      return res.status(403).json({ error: 'Unauthorized - You are not allowed to access this user\'s data' });
    }

    // Find the admin by ID
    const user = await User.findById(userId);

    // Check if the admin exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the admin details
    res.json({
      status: '200',
      message: 'User data fetched successfully',
      admin: user
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'danishhusain2000@gmail.com',
    pass: 'hyvm fjfe iaoq vnbe',
  },
});

// exports.resetPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Find the user by email (replace with a database query)
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     // Generate a 4-digit temporary code
//     const resetToken = Math.floor(1000 + Math.random() * 9000).toString();


//     // Store the reset token and update user in the database
//     // user.resetToken = resetToken;
//     user.emailVerification.otp = resetToken;
//     await user.save();

//     // Send a password reset email
//     const mailOptions = {
//       from: 'danishhusain2000@gmail.com',
//       to: email,
//       subject: 'Password Reset',
//       // text: `Click the following link to reset your password: http://localhost:4000/reset/${resetToken}`,
//       text: `Dear ${user.userName},

//       Thank you for using demoCompany services.

//       Your One-Time Password (OTP) for account verification is: ${resetToken}.

//       Please enter this code on the verification screen to complete the process.

//       If you did not request this OTP, please contact our support team immediately.

//       Thank you,
//       demoCompany Team
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);

//     console.log(`Email sent: ${info.response}`);
//     return res.status(200).json({ message: 'Password reset email sent successfully', status: true });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Failed to send reset email' });
//   }
// };

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email (replace with a database query)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Generate a 4-digit temporary code
    const otp = generateOTP();





    // Store the reset token and update user in the database
    user.emailVerification.otp = otp;
    await user.save();
    var message = "this is reset password otp"
    // Send OTP via email
    await sendOtpViaEmail(email, otp, message);

    return res.status(200).json({ message: 'Password reset email sent successfully', status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send reset email' });
  }
};




exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email (replace with a database query)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("otp", email, otp)
    // Check if the provided OTP matches the stored OTP
    console.log("<>", user, "<<>>", user.emailVerification.otp, "<<<>>>", otp)
    if (user.emailVerification.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Clear the OTP after successful verification
    // user.emailVerification.otp = null;
    // await user.save();

    return res.status(200).json({ message: 'OTP verification successful', status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Endpoint to handle password reset
exports.passwordUpdate = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Find the user by email (replace with a database query)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's password securely
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save(); // Save changes to the database

    return res.status(200).json({ message: 'Password change successful', status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};











