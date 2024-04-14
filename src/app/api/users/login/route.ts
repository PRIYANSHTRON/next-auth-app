import Users from "@/models/user.model";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log(reqBody);

        const user = await Users.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { msg: "user does not exist" },
                { status: 400 }
            );
        }

        console.log(user);

        const passwordValidity = await bcryptjs.compare(
            password,
            user.password
        );

        if (!passwordValidity) {
            return NextResponse.json(
                {
                    msg: "incorrect credentials",
                    success: true,
                },
                { status: 400 }
            );
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json(
            {
                msg: "Email verified successfully",
                success: true,
            },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
