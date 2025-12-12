// ...existing code...
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useMemo } from 'react';

// ...existing code...
export const Route = createFileRoute('/userdashboard/eventhistory')({
  component: EventHistory,
})

// ---------- MOCK DATA ----------
// ...existing code...
const MOCK_EVENTS = [
  {
    id: "e1",
    title: "DIOCESIAN YOUTH HARVEST 2025",
    datetime: "2025-09-20T17:00:00.000Z",
    location: "Archbishop Vining Memorial Church Cathedral",
    status: "attended",
    price: 10000,
    receiptUrl: "/receipts/e1.pdf",
  },
  {
    id: "e2",
    title: "JOSHUA GENERATION CONFERENCE",
    datetime: "2025-10-02T19:00:00.000Z",
    location: "ST PAULS CATHEDRAL LAGOS",
    status: "paid",
    price: 5000,
    receiptUrl: "/receipts/e2.pdf",
  },
  {
    id: "e3",
    title: "DIOCESAN YOUTH CAMP",
    datetime: "2025-11-15T15:00:00.000Z",
    location: "Ipaja Youth Camp Ground",
    status: "pending",
    price: 2500,
  },
];

// ---------- EVENT HISTORY PAGE ----------
function EventHistory() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return MOCK_EVENTS.filter((ev) => {
      if (filter !== "all" && ev.status !== filter) return false;
      if (query && !ev.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [filter, query]);

  function formatDate(iso) {
    return new Date(iso).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold">Event History</h1>
          <p className="text-sm text-gray-500">
            View and manage your past and upcoming event activities.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search events"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="attended">Attended</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </header>

      <div className="space-y-4">
        {filtered.map((ev) => (
          <div key={ev.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg">{ev.title}</h2>
                <p className="text-sm text-gray-500">{formatDate(ev.datetime)}</p>
                <p className="text-sm text-gray-500">{ev.location}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ev.status === "attended"
                    ? "bg-green-100 text-green-800"
                    : ev.status === "paid"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {ev.status}
              </span>
            </div>

            <div className="mt-3 flex gap-2 flex-wrap">
              {(ev.status === "paid" || ev.status === "attended") && (
                <button className="px-3 py-1 rounded-md bg-gray-200 text-sm hover:bg-gray-300">
                  Download Ticket
                </button>
              )}
              {ev.status === "paid" && ev.receiptUrl && (
                <button
                  onClick={() => window.open(ev.receiptUrl, "_blank")}
                  className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  View Receipt
                </button>
              )}
              {ev.status === "pending" && (
                <button
                  onClick={() => navigate({ to: "/checkout/$eventId", params: { eventId: ev.id } })}
                  className="px-3 py-1 rounded-md bg-yellow-500 text-sm hover:bg-yellow-600"
                >
                  Complete Payment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
// ...existing code...