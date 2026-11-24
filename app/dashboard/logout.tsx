"use client"

import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-600 text-white px-5 py-2 rounded"
        >
            Logout
        </button>
    );
}
