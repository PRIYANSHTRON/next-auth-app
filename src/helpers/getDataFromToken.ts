import Users from "@/models/user.model";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


//gets the user ID from token which comes from cookies
export function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const tokenData: any = jwt.verify(token, process.env.SECRET_KEY!); // decoding token to get user data

        return tokenData.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
