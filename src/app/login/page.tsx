"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function page() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("signup succces", response);
            router.push("/aboutMe");
        } catch (error: any) {
            console.log("signup failed", error);
            toast.error("signup failed");
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <h1 className="text-white text-3xl my-4">
                {loading ? "Loading..." : "Login"}
            </h1>

            <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 dark:border-gray-600 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3  dark:border-gray-600 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                        }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 active:scale-90 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={buttonDisabled}
                        onClick={onLogin}
                    >
                         {buttonDisabled ? "fill the form" : "Login"}
                    </button>
                </div>
            </div>
            <Link href="/signup" className="text-white underline p-2">
                Signup Page
            </Link>
        </div>
    );
}

export default page;
