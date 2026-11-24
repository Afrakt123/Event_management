"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EventList() {

    const [events, setEvents] = useState<any[]>([]);
    const router = useRouter();

    const getEvents = async () => {
        try {
            const res = await fetch("/api/event");
            const data = await res.json();

            if (res.status === 200) {
                setEvents(data.data);
            } else if (res.status === 401) {
                router.push("/login");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Unable to fetch events");
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const deleteEvent = async (id: string) => {

        const confirmDelete = confirm("Do you want to delete this event?");

        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/event/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (res.status === 200) {
                toast.success(data.message);
                getEvents();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Unable to delete event");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {events.length > 0 ? (

                events.map((event) => (

                    <div key={event._id} className="bg-white p-5 rounded-lg shadow">

                        <h2 className="text-xl font-bold">
                            {event.eventName}
                        </h2>

                        <p className="text-gray-600 mt-2">
                            {event.description}
                        </p>

                        <p className="mt-3">
                            Date: {new Date(event.eventDate).toLocaleDateString()}
                        </p>

                        <p>Venue: {event.venue}</p>
                        <p>Type: {event.eventType}</p>
                        <p>Status: {event.status}</p>

                        <div className="flex gap-4 mt-5">

                            <Link
                                href={`/dashboard/${event._id}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() => deleteEvent(event._id)}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))

            ) : (

                <p className="text-gray-600 text-center col-span-3">
                    No events found
                </p>

            )}

        </div>
    );
}
