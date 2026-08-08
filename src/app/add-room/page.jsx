"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PageTitle from "@/components/PageTitle";
import PrivateRoute from "@/components/PrivateRoute";
import { AMENITIES } from "@/lib/mockData";

function AddRoomForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
    amenities: [],
  });

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Room added successfully");
    router.push("/my-listings");
  };

  return (
    <>
      <PageTitle title="StudyNook – Add Room" />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="heading-section">Add a Study Room</h1>
          <p className="mt-2 text-muted">List your private study space for others to book</p>
        </div>

        <form onSubmit={handleSubmit} className="card-base space-y-5 p-6 sm:p-8">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Room Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              placeholder="e.g., Quiet Corner Studio"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe your study room..."
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Image URL</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="input-field"
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Floor</label>
              <input
                type="text"
                value={form.floor}
                onChange={(e) => setForm({ ...form, floor: e.target.value })}
                className="input-field"
                placeholder="e.g., 3rd Floor"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Capacity</label>
              <input
                type="number"
                min={1}
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                className="input-field"
                placeholder="e.g., 4"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Hourly Rate ($)</label>
            <input
              type="number"
              min={1}
              value={form.hourlyRate}
              onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
              className="input-field"
              placeholder="e.g., 5"
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium">Amenities</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {AMENITIES.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm transition-all ${
                    form.amenities.includes(amenity)
                      ? "border-primary bg-primary/5 dark:border-accent dark:bg-accent/10"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="h-4 w-4 rounded accent-accent"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Add Room
          </button>
        </form>
      </div>
    </>
  );
}

export default function AddRoomPage() {
  return (
    <PrivateRoute>
      <AddRoomForm />
    </PrivateRoute>
  );
}
