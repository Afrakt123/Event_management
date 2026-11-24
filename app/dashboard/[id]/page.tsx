
"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import toast from "react-hot-toast";

export default function EditEvent() {
    return (
        <Suspense fallback={<div>Loading event...</div>}>
            <EditEventContent />
        </Suspense>
    );
}

function EditEventContent() {

    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter();

    const [event, setEvent] = useState({
        eventName: "",
        description: "",
        eventDate: "",
        venue: "",
        eventType: "",
        status: "Upcoming"
    });

    useEffect(() => {
        getEvent();
    }, [id]);

    const getEvent = async () => {
        try {
            const res = await fetch(`/api/event/${id}`);
            const data = await res.json();

            if (res.status === 200) {
                setEvent({
                    eventName: data.data.eventName,
                    description: data.data.description,
                    eventDate: new Date(data.data.eventDate).toISOString().split("T")[0],
                    venue: data.data.venue,
                    eventType: data.data.eventType,
                    status: data.data.status
                });
            } else if (res.status === 401) {
                router.push("/login");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Unable to fetch event");
        }
    };

    const handleUpdate = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/event/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            });

            const data = await res.json();

            if (res.status === 200) {
                toast.success(data.message);
                router.push("/dashboard");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error("Unable to update event");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow w-full max-w-lg">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Edit Event
                </h1>

                <form onSubmit={handleUpdate}>

                    <input
                        value={event.eventName}
                        onChange={(e) => setEvent({
                            ...event,
                            eventName: e.target.value
                        })}
                        placeholder="Event Name"
                        className="border p-3 rounded w-full mb-3"
                    />

                    <textarea
                        value={event.description}
                        onChange={(e) => setEvent({
                            ...event,
                            description: e.target.value
                        })}
                        placeholder="Description"
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
                        value={event.venue}
                        onChange={(e) => setEvent({
                            ...event,
                            venue: e.target.value
                        })}
                        placeholder="Venue"
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
                        Update Event
                    </button>

                </form>

            </div>

        </div>
    );
}
