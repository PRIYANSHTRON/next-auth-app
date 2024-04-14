"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Profile() {
    const router = useRouter();
    const [userData, setUserData] = useState({});

    const getUserData = async () => {
        try {
            const response = await axios.post("/api/users/aboutMe");
            setUserData(response.data.data);
            console.log(response.data.data);
        } catch (error: any) {
            console.log(error);
        }
    };

    const { username, email }: any = userData;

    const handleLogout = async () => {
        try {
            await axios.post("/api/users/logout");
            console.log("logout success");
            router.push("/signup");
        } catch (error: any) {
            console.log("error in logout",error);
            
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <div className=" bg-white px-4 p-2 text-3xl text-sky-500 m-2 rounded-md">
                {username}
            </div>
            <div className=" bg-white px-4 p-2 text-3xl text-sky-500 m-2 rounded-md">
                {email}
            </div>
            <button
                className="bg-blue-500 active:scale-90 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default Profile;
