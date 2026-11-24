"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {

    const router = useRouter();

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleRegister = async (e: any) => {
        e.preventDefault();

        const { name, email, password } = userDetails;

        if (!name || !email || !password) {
            toast.error("Please fill the form completely");
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetails)
            });

            const serverResponse = await res.json();

            if (res.status === 201) {
                toast.success(serverResponse.message);
                setUserDetails({
                    name: "",
                    email: "",
                    password: ""
                });
                router.push("/login");
            } else {
                toast.error(serverResponse.message);
            }

        } catch (error) {
            toast.error("Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">

            <div className="bg-blue-400 p-5 rounded w-100">

                <h1 className="text-center text-2xl text-white font-bold">
                    Event Management
                </h1>

                <p className="text-white text-center font-bold mt-2">
                    REGISTER
                </p>

                <form onSubmit={handleRegister}>

                    <div className="my-3 w-full">
                        <input
                            value={userDetails.name}
                            onChange={(e) => setUserDetails({
                                ...userDetails,
                                name: e.target.value
                            })}
                            type="text"
                            placeholder="Name"
                            className="rounded bg-gray-100 p-3 w-full"
                        />
                    </div>

                    <div className="my-3 w-full">
                        <input
                            value={userDetails.email}
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
                            value={userDetails.password}
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
                            Register
                        </button>

                        <p className="p-2 m-2 text-white">
                            Already a User? Click here to{" "}
                            <Link href="/login" className="text-blue-800 underline">
                                Login
                            </Link>
                        </p>

                    </div>

                </form>

            </div>

        </div>
    );
}
