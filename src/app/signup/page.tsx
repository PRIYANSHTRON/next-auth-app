"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function signupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("signup succces", response);
            router.push("/login");
        } catch (error: any) {
            console.log("signup failed", error);
            toast.error("signup failed");
        }
    };

        useEffect(() => {
            if (
                user.email.length > 0 &&
                user.password.length > 0 &&
                user.username.length > 0
            ) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true)
            }
        }, [user]);
    return (
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <h1 className="text-white text-3xl my-4">{loading ? "submitting form..." : "Signup"}</h1>
            <div
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        id="username"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={user.username}
                        onChange={(e) => {
                            setUser({ ...user, username: e.target.value });
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
                        className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
                        onClick={onSignup}
                        disabled={buttonDisabled}
                    >
                        {buttonDisabled ? "fill the form" : "Signup"}
                    </button>
                </div>
            </div>
            <Link href="/login" className="text-white underline p-2">
                Login Page
            </Link>
        </div>
    );
}

export default signupPage;

