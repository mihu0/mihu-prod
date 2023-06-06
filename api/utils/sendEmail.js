import nodemailer from "nodemailer";
import { EMAIL_FROM,EMAIL_PASSWORD,CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN,} from "../config/config.js"
import {google} from "googleapis";

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
// oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

export const sendEmail = async(options) => {

    try {
        
        //const accessToken = (await oAuth2Client.getAccessToken()).token
        //console.log(accessToken,REDIRECT_URI,REFRESH_TOKEN,CLIENT_ID,CLIENT_SECRET)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            //port: 995,
            port: 465,
    
            //secure : false, // true for 465, false for other ports
            type: "SMTP",
            secure: true,
            // port: 587,
            //secure: false, 
            // requireTLS: true,
            logger: true,
            debug: true,
            auth: {
                //type:"OAuth2",
                user: "mihu.store0@gmail.com",
                //clientId: CLIENT_ID,
                //accessToken,
                //clientSecret: CLIENT_SECRET,
                //refreshToken: REFRESH_TOKEN,
                pass: EMAIL_PASSWORD,
            },
        });
    
        const mailOptions = {
            from: "MIHU <mihu.store0@gmail.com>",
            to: options.to,
            subject: options.subject,
            text:"Password change",
            html: options.text,
        };
    
        const result = await transporter.sendMail(mailOptions);
        return result;
        
    } catch (error) {
        return error;
    }
    
};
