import transporter from "../config/mail.config";

//send verification to users email 
//and token should be generated while being registered 
export async function sendVerificationMail(toEmail: string, token: string) {
    const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify/${token}`;
    const mailOptions = {
        from:`"Book Reader" <${process.env.MAIL_USER}> `,
        to: toEmail,
        subject:"Verify your email",
        html: `<p>Please click <a href="${verificationUrl}">here</a> to verify your email.
            Or if the link doesnot works. </p>
            <p> Your token is ${token} </p>`

    };
     try {
        await transporter.sendMail(mailOptions);
    } catch (error: any) {
        throw new Error('Error while sending update mail');
    }
}

