
import Link from "next/link";
import EventList from "./eventList";
import Logout from "./logout";

export default function Dashboard() {

    return (
        <div className="min-h-screen bg-slate-50 px-5 py-10">

            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-10">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Event Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your events
                        </p>
                    </div>

                    <Logout />
                </div>

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        All Events
                    </h2>

                    <Link
                        href="/dashboard/add"
                        className="bg-blue-700 text-white px-5 py-3 rounded"
                    >
                        + Add Event
                    </Link>

                </div>

                <EventList />

            </div>

        </div>
    );
}
