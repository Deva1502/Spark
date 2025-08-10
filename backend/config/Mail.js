//nodejs me agar hume koi mail send karna hai to hum nodemailer pacage ko use karte haii
import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodeMailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (to,otp)=>{
    transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"OTP for Forgot Password",
        html:`<h1>OTP for forgot password is <b>${otp} </b>. It is valid for 5 minutes</h1>`
    })
}

export default sendMail