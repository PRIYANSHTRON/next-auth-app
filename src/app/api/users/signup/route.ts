import Users from "@/models/user.model";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();  //use await in nextjs for getting body content
        const { username, password, email } = reqBody;
        //validation
        console.log(reqBody);
        const user = await Users.findOne({ email });

        if (user) {
            return NextResponse.json(
                { msg: "user already exist" },
                { status: 400 }
            );
        }

        //password hashing
        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new Users({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        const emailResponse = sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id,
        });

        return NextResponse.json({
            msg: "User Registered Successfully",
            success: true,
            savedUser,
        });

        
    } catch (error: any) {
        return NextResponse.json({ error: "error.message" }, { status: 500 });
    }
}

export function GET(request: NextRequest) {
    return NextResponse.json({msg:"hello from signup page"})
}