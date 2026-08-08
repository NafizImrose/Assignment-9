"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import RoomCard from "@/components/RoomCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { getUserListings } from "@/lib/mockData";

function MyListingsContent() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(getUserListings(user.id));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [user.id]);

  return (
    <>
      <PageTitle title="StudyNook – My Listings" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="heading-section">My Listings</h1>
            <p className="mt-2 text-muted">Manage your study room listings</p>
          </div>
          <Link href="/add-room" className="btn-primary">
            + Add New Room
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner fullPage />
        ) : listings.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <svg className="h-8 w-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-primary dark:text-white">No listings yet</h3>
            <p className="mt-2 text-sm text-muted">Start earning by listing your study room</p>
            <Link href="/add-room" className="btn-primary mt-6 inline-flex">
              Add Your First Room
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function MyListingsPage() {
  return (
    <PrivateRoute>
      <MyListingsContent />
    </PrivateRoute>
  );
}
