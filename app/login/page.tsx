"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async (e: any) => {
        e.preventDefault();

        const { email, password } = userDetails;

        if (!email || !password) {
            toast.error("Enter email and password");
            return;
        }

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        if (result?.error) {
            toast.error("Invalid email or password");
        } else {
            toast.success("Login Successful");
            window.location.href = "/dashboard";
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">

            <div className="bg-blue-400 p-5 rounded w-100">

                <h1 className="text-center text-2xl text-white font-bold">
                    Event Management
                </h1>

                <p className="text-white text-center font-bold mt-2">
                    LOGIN
                </p>

                <form onSubmit={handleLogin}>

                    <div className="my-3 w-full">
                        <input
                            onChange={(e) => setUserDetails({
                                ...userDetails,
                                email: e.target.value
                            })}
                            type="email"
                            placeholder="Email"
                            className="rounded bg-gray-100 p-3 w-full"
                        />
                    </div>

                    <div className="my-3 w-full">
                        <input
                            onChange={(e) => setUserDetails({
                                ...userDetails,
                                password: e.target.value
                            })}
                            type="password"
                            placeholder="Password"
                            className="rounded bg-gray-100 p-3 w-full"
                        />
                    </div>

                    <div className="my-3 w-full">

                        <button
                            type="submit"
                            className="bg-blue-800 p-2 text-white rounded w-full"
                        >
                            Login
                        </button>

                        <p className="text-white p-2">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-blue-800 underline">
                                Register
                            </Link>
                        </p>

                    </div>

                </form>

            </div>

        </div>
    );
}
