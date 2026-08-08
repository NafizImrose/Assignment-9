"use client";

import { useState } from "react";
import { AMENITIES } from "@/lib/mockData";
import toast from "react-hot-toast";
import Modal from "./Modal";

export default function EditRoomModal({ isOpen, onClose, room, onSave }) {
  const [form, setForm] = useState({
    name: room.name,
    description: room.description,
    image: room.image,
    floor: room.floor,
    capacity: room.capacity,
    hourlyRate: room.hourlyRate,
    amenities: [...room.amenities],
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
    onSave(form);
    toast.success("Room updated successfully");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Room">
      <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Room Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="input-field resize-none"
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
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Floor</label>
            <input
              type="text"
              value={form.floor}
              onChange={(e) => setForm({ ...form, floor: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Capacity</label>
            <input
              type="number"
              min={1}
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) })}
              className="input-field"
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
            onChange={(e) => setForm({ ...form, hourlyRate: parseInt(e.target.value) })}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {AMENITIES.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 text-sm">
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
          Save Changes
        </button>
      </form>
    </Modal>
  );
}
