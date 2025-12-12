import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

function DashboardJoinUnit() {
  const [units, setUnits] = useState([
    {
      id: 1,
      name: "Media Team",
      description: "Handles all media, photography and livestream activities.",
      members: 24,
      status: "member",
    },
    {
      id: 2,
      name: "Welfare & Hospitality",
      description: "Supports new members and oversees hospitality logistics.",
      members: 18,
      status: "pending",
    },
    {
      id: 3,
      name: "Technical Unit",
      description: "Manages sound, lighting and tech infrastructure during events.",
      members: 30,
      status: "none",
    },
    {
      id: 4,
      name: "Ushering Team",
      description: "Coordinates member seating, flow and service order.",
      members: 15,
      status: "none",
    },
  ]);

  const handleJoin = (id) => {
    setUnits((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "pending" } : u))
    );
  };

  const joinedUnits = units.filter(
    (u) => u.status === "member" || u.status === "pending"
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Join and manage your service units</p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <img
            src="https://ui-avatars.com/api/?name=Samuel+Akanbi"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-800">Samuel Akanbi</p>
            <p className="text-xs text-gray-500">samuelakanbi@example.com</p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{joinedUnits.length}</p>
          <p className="text-gray-600 text-sm">Units Joined</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {units.filter((u) => u.status === "pending").length}
          </p>
          <p className="text-gray-600 text-sm">Pending Requests</p>
        </div>
      </div>

      {/* Available Units */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Available Units</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                  {unit.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{unit.description}</p>
                <p className="text-xs text-gray-400">{unit.members} members</p>
              </div>

              <div className="mt-4">
                {unit.status === "member" ? (
                  <button
                    disabled
                    className="w-full bg-green-100 text-green-700 py-2 rounded-md font-medium cursor-default"
                  >
                    ✓ Member
                  </button>
                ) : unit.status === "pending" ? (
                  <button
                    disabled
                    className="w-full bg-yellow-100 text-yellow-700 py-2 rounded-md font-medium cursor-default"
                  >
                    ⏳ Pending Approval
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoin(unit.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                  >
                    Join Unit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Joined Units */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">My Units</h2>
        {joinedUnits.length > 0 ? (
          <ul className="bg-white rounded-lg shadow divide-y divide-gray-100">
            {joinedUnits.map((unit) => (
              <li
                key={unit.id}
                className="p-4 flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-700">{unit.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {unit.status === "member" ? "✓ Member" : "⏳ Awaiting Approval"}
                  </p>
                </div>
                {unit.status === "member" ? (
                  <button className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition">
                    View
                  </button>
                ) : (
                  <span className="text-sm text-gray-400">Pending...</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">
            You haven't joined any units yet.
          </p>
        )}
      </section>
    </div>
  );
}

// Register route for tanstack router
export const Route = createFileRoute("/userdashboard/joinaunit")({
  component: DashboardJoinUnit,
});