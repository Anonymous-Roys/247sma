const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

let twilioClient;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

const sendEmailOTP = async (email, otp) => {
   const expiryTime = new Date(Date.now() + 5 * 60 * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const mailOptions = {
    from: '"SMAGRITRADE VERIFICATION" <davidarhin2005@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    html: `
    <div style="max-width: 480px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 24px;">
        <h2 style="color: #15803d; font-size: 22px; margin-bottom: 16px;">🔐 OTP Verification</h2>
        
        <p style="font-size: 16px; color: #1f2937;">
          Use the following OTP to continue:
        </p>
        
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #15803d; text-align: center; margin: 16px 0;">
          ${otp}
        </div>
        
        <p style="font-size: 14px; color: #4b5563; margin-bottom: 16px; text-align: center;">
          This code will expire in <strong style="color: #15803d;">5 minutes</strong> (by <strong>${expiryTime}</strong>).
        </p>
        
        <div style="width: 100px; margin: 0 auto 20px auto;">
          <div style="background-color: #d1fae5; border-radius: 6px; padding: 8px 12px; text-align: center; color: #065f46; font-weight: 600; font-size: 14px;">
            05:00
          </div>
        </div>
        
        <p style="font-size: 13px; color: #6b7280; text-align: center;">
          If you did not request this, please ignore this message.
        </p>
        
        <p style="text-align: center; font-size: 13px; color: #10b981; margin-top: 24px;">
          — 24/7 SMAGRITRADE Team
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendSMSOTP = async (phone, otp) => {
  if (!twilioClient || !process.env.TWILIO_PHONE_NUMBER) {
    throw new Error('SMS service not configured');
  }

  await twilioClient.messages.create({
    body: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};

module.exports = { sendEmailOTP, sendSMSOTP };