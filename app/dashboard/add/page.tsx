
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddEvent() {

    const router = useRouter();

    const [event, setEvent] = useState({
        eventName: "",
        description: "",
        eventDate: "",
        venue: "",
        eventType: "",
        status: "Upcoming"
    });

    const handleAdd = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            });

            const data = await res.json();

            if (res.status === 201) {
                toast.success(data.message);
                router.push("/dashboard");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error("Unable to add event");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow w-full max-w-lg">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Add New Event
                </h1>

                <form onSubmit={handleAdd}>

                    <input
                        type="text"
                        placeholder="Event Name"
                        value={event.eventName}
                        onChange={(e) => setEvent({
                            ...event,
                            eventName: e.target.value
                        })}
                        className="border p-3 rounded w-full mb-3"
                    />

                    <textarea
                        placeholder="Description"
                        value={event.description}
                        onChange={(e) => setEvent({
                            ...event,
                            description: e.target.value
                        })}
                        className="border p-3 rounded w-full mb-3"
                    />

                    <input
                        type="date"
                        value={event.eventDate}
                        onChange={(e) => setEvent({
                            ...event,
                            eventDate: e.target.value
                        })}
                        className="border p-3 rounded w-full mb-3"
                    />

                    <input
                        type="text"
                        placeholder="Venue"
                        value={event.venue}
                        onChange={(e) => setEvent({
                            ...event,
                            venue: e.target.value
                        })}
                        className="border p-3 rounded w-full mb-3"
                    />

                    <select
                        value={event.eventType}
                        onChange={(e) => setEvent({
                            ...event,
                            eventType: e.target.value
                        })}
                        className="border p-3 rounded w-full mb-3"
                    >
                        <option value="">Select Event Type</option>
                        <option value="Conference">Conference</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Party">Party</option>
                        <option value="Other">Other</option>
                    </select>

                    <select
                        value={event.status}
                        onChange={(e) => setEvent({
                            ...event,
                            status: e.target.value
                        })}
                        className="border p-3 rounded w-full mb-4"
                    >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-blue-700 text-white p-3 rounded w-full"
                    >
                        Add Event
                    </button>

                </form>

            </div>

        </div>
    );
}
