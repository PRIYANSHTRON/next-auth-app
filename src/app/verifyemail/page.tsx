"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

function verifyUserPage() {
    const [token, setToken] = useState("No token");
    const [isVerified, setIsVerified] = useState(false);

    const handleClick = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            console.log(" user verification successful");
            
            setIsVerified(true);
        } catch (error: any) {
            console.error("user verification failed" ,error);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
    }, []);

    return (
        <div className="flex justify-center items-center flex-col gap-4 h-screen">
            <div className="text-black bg-orange-500 p-2 px-4">{token}</div>
            {
                !isVerified && <button
                onClick={handleClick}
                className="px-6 py-2 bg-sky-600 rounded-md active:scale-90 shadow-md shadow-slate-700"
            >
                Verify
            </button>
            }
            {isVerified ? (
                <div className="text-green-500 p-2 px-4 bg-white font-bold ">
                    Verified
                </div>
            ) : (
                <div className="font-bold text-red-500 px-4 p-2 bg-white">
                    Not Verified
                </div>
            )}
        </div>
    );
}

export default verifyUserPage;
