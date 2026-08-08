"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageTitle from "@/components/PageTitle";
import LoadingSpinner from "@/components/LoadingSpinner";
import PrivateRoute from "@/components/PrivateRoute";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ConfirmModal";
import { bookings as mockBookings } from "@/lib/mockData";

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        status === "confirmed"
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      }`}
    >
      {status}
    </span>
  );
}

function isFutureDate(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookingDate = new Date(dateStr);
  return bookingDate >= today;
}

function MyBookingsContent() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBookings([...mockBookings]);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    setBookings((prev) =>
      prev.map((b) => (b.id === cancelId ? { ...b, status: "cancelled" } : b))
    );
    toast.success("Booking cancelled");
    setCancelId(null);
  };

  return (
    <>
      <PageTitle title="StudyNook – My Bookings" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="heading-section">My Bookings</h1>
          <p className="mt-2 text-muted">View and manage your room reservations</p>
        </div>

        {loading ? (
          <LoadingSpinner fullPage />
        ) : bookings.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="font-display text-xl font-bold text-primary dark:text-white">
              You have no bookings yet.
            </h3>
            <p className="mt-2 text-sm text-muted">Browse available rooms to make your first booking</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 md:block">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Room</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Cost</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="bg-white dark:bg-card-dark">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={booking.room.image}
                            alt={booking.room.name}
                            width={48}
                            height={48}
                            className="rounded-lg object-cover"
                          />
                          <span className="text-sm font-medium">{booking.room.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{booking.date}</td>
                      <td className="px-6 py-4 text-sm">{booking.startTime} – {booking.endTime}</td>
                      <td className="px-6 py-4 text-sm font-semibold">${booking.totalCost}</td>
                      <td className="px-6 py-4"><StatusBadge status={booking.status} /></td>
                      <td className="px-6 py-4">
                        {booking.status === "confirmed" && isFutureDate(booking.date) && (
                          <button
                            onClick={() => setCancelId(booking.id)}
                            className="text-sm font-medium text-danger hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {bookings.map((booking) => (
                <div key={booking.id} className="card-base p-4">
                  <div className="flex gap-4">
                    <Image
                      src={booking.room.image}
                      alt={booking.room.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-display font-bold text-primary dark:text-white">
                          {booking.room.name}
                        </h3>
                        <StatusBadge status={booking.status} />
                      </div>
                      <p className="mt-1 text-sm text-muted">{booking.date}</p>
                      <p className="text-sm text-muted">{booking.startTime} – {booking.endTime}</p>
                      <p className="mt-1 text-sm font-semibold">${booking.totalCost}</p>
                      {booking.status === "confirmed" && isFutureDate(booking.date) && (
                        <button
                          onClick={() => setCancelId(booking.id)}
                          className="mt-2 text-sm font-medium text-danger hover:underline"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        isOpen={!!cancelId}
        onClose={() => setCancelId(null)}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Cancel Booking"
        danger
        onConfirm={handleCancel}
      />
    </>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}
