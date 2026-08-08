"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import RoomCard from "@/components/RoomCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AMENITIES, filterRooms } from "@/lib/mockData";

export default function RoomsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(20);
  const [floor, setFloor] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const results = filterRooms({
      search,
      amenities: selectedAmenities,
      minRate,
      maxRate,
      floor,
    });
    setFilteredRooms(results);
  }, [search, selectedAmenities, minRate, maxRate, floor]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <>
      <PageTitle title="StudyNook – Available Rooms" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="heading-section">All Study Rooms</h1>
          <p className="mt-2 text-muted">Browse and filter available study spaces</p>
        </div>

        {/* Search & Filters */}
        <div className="card-base mb-8 p-6">
          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by room name..."
              className="input-field"
            />
          </div>

          <div className="mb-4">
            <p className="mb-2 text-sm font-medium">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedAmenities.includes(amenity)
                      ? "bg-primary text-white dark:bg-accent dark:text-primary"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Min Rate ($/hr)</label>
              <input
                type="number"
                min={0}
                value={minRate}
                onChange={(e) => setMinRate(Number(e.target.value))}
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Max Rate ($/hr)</label>
              <input
                type="number"
                min={0}
                value={maxRate}
                onChange={(e) => setMaxRate(Number(e.target.value))}
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Floor</label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="e.g., Floor 3"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner fullPage />
        ) : filteredRooms.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <svg className="h-8 w-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-primary dark:text-white">No rooms found</h3>
            <p className="mt-2 text-sm text-muted">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
