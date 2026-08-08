"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { truncateText, formatCapacity } from "@/lib/mockData";

export default function RoomCard({ room }) {
  const visibleAmenities = room.amenities.slice(0, 3);
  const extraCount = room.amenities.length - 3;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="card-base group flex h-full flex-col overflow-hidden hover:shadow-lg"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute right-3 top-3 rounded-lg bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          ${room.hourlyRate}/hr
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-primary dark:text-white">
          {room.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {truncateText(room.description)}
        </p>

        <div className="mt-3 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {room.floor}
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {formatCapacity(room.capacity)}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleAmenities.map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-accent/20 dark:text-accent"
            >
              {amenity}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-muted dark:bg-gray-800">
              +{extraCount} more
            </span>
          )}
        </div>

        <Link href={`/rooms/${room.id}`} className="btn-primary mt-4 w-full text-center">
          View Details
        </Link>
      </div>
    </motion.article>
  );
}
