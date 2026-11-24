import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 m-5 w-full">

      <div className="md:grid grid-cols-2 items-center gap-10">

        <div>
          <h1 className="text-rd-700 font-bold text-4xl">
            EVENT MANAGEMENT
          </h1>

          <h1 className="text-red-500 text-2xl font-bold mt-4">
            Plan Your Events, Make Them Memorable
          </h1>

          <p className="text-gray-500 my-5 text-justify text-lg">
            Event Management System is a simple application designed to
            organize and manage events efficiently. Users can create new
            events, view event details, update information and delete
            events whenever required. Manage your events, keep track of
            important dates, venues and event status in one place.
          </p>

          <Link
            href="/login"
            className="bg-red-700 text-white p-2 rounded"
          >
            LET'S START
          </Link>

          <p className="text-gray-500 mt-5">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-700 font-semibold underline"
            >
              Register
            </Link>
          </p>
        </div>

        <div className="flex justify-center mt-10 md:mt-0">

          <div className="bg-blue-50 rounded-2xl p-10 w-full max-w-md">

            <div className="text-center">

              <div className="text-8xl mb-6">
                📅
              </div>

              <h2 className="text-blue-700 text-2xl font-bold">
                Manage Your Events
              </h2>

              <p className="text-gray-500 mt-3">
                Create, organize and keep track of all your events easily.
              </p>

            </div>

            <div className="mt-8 space-y-3">

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-700">
                  📌 Create Events
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-700">
                  📅 Manage Event Dates
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-700">
                  ✓ Track Event Status
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
