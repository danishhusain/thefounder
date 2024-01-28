const nodemailer = require('nodemailer');





exports.generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};


exports.sendOtpViaEmail = async (email, otp, message) => {
    // Configure your email transport (replace with your email provider's details)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'danishhusain2000@gmail.com', // Replace with your email address
            pass: 'hyvm fjfe iaoq vnbe', // Replace with your email password
        },
    });

    const mailOptions = {
        from: 'danishhusain2000@gmail.com',
        to: email,
        subject: 'Email Verification OTP ',
        text: `Your OTP for email verification is: ${otp} ${message}`,
    };
    await transporter.sendMail(mailOptions);
};
