import nodemailer from "nodemailer";
import Users from "@/models/user.model";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, userId, emailType }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        const htmlContent = `<p><a href="${
            process.env.DOMAIN
        }/verifyemail?token=${hashedToken}">Click here</a>to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
        }<br> OR copy paste the link <br>${
            process.env.DOMAIN
        }/verifyemail?token=${hashedToken} in yout browser</p>`;

        //generating verify token and forgot password token
        if (emailType === "VERIFY") {
            await Users.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                },
            });
        } else if (emailType === "RESET") {
            await Users.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000, 
                },
            });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f8608d8db64bf0",
                pass: "621b64c33f1e6a",
            },
        });

        const mailOptions = {
            from: "priyansh.trial@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password",
            html: htmlContent,
        };
        //sending verfication Email
        const mailResponse = await transporter.sendMail(mailOptions);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
