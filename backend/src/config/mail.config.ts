import nodemailer from 'nodemailer';
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

export default transporter;