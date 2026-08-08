"use client";

import { useState } from "react";
import { TIME_SLOTS } from "@/lib/mockData";
import toast from "react-hot-toast";
import Modal from "./Modal";

export default function BookingModal({ isOpen, onClose, room }) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [specialNote, setSpecialNote] = useState("");

  const startIndex = TIME_SLOTS.indexOf(startTime);
  const availableEndTimes = TIME_SLOTS.slice(startIndex + 1);

  const startHour = parseInt(startTime.split(":")[0]);
  const endHour = parseInt(endTime.split(":")[0]);
  const totalCost = (endHour - startHour) * room.hourlyRate;

  const handleStartChange = (val) => {
    setStartTime(val);
    const newStartIndex = TIME_SLOTS.indexOf(val);
    const currentEndIndex = TIME_SLOTS.indexOf(endTime);
    if (currentEndIndex <= newStartIndex) {
      setEndTime(TIME_SLOTS[newStartIndex + 1] || TIME_SLOTS[newStartIndex]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (endHour <= startHour) {
      toast.error("End time must be after start time");
      return;
    }
    toast.success("Room booked successfully!");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Book ${room.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Start Time</label>
            <select
              value={startTime}
              onChange={(e) => handleStartChange(e.target.value)}
              className="input-field"
              required
            >
              {TIME_SLOTS.slice(0, -1).map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">End Time</label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="input-field"
              required
            >
              {availableEndTimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-xl bg-accent/10 p-4 text-center">
          <p className="text-sm text-muted">Total Cost</p>
          <p className="font-display text-2xl font-bold text-primary dark:text-accent">
            ${totalCost}
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Special Note <span className="text-muted">(optional)</span>
          </label>
          <textarea
            value={specialNote}
            onChange={(e) => setSpecialNote(e.target.value)}
            rows={3}
            className="input-field resize-none"
            placeholder="Any special requirements..."
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Confirm Booking
        </button>
      </form>
    </Modal>
  );
}
