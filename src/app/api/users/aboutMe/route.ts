import Users from "@/models/user.model";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await Users.findOne({ _id: userId }).select("-password"); // selecting and removing password field from incoming data
        return NextResponse.json({
            msg: "User found",
            data: user,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
