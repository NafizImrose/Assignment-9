"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageTitle from "@/components/PageTitle";
import RoomCard from "@/components/RoomCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { rooms } from "@/lib/mockData";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const latestRooms = rooms.slice(0, 6);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageTitle title="StudyNook – Home" />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Find Your Perfect{" "}
              <span className="text-accent">Study Room</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Browse and book quiet, private study rooms in your library.
              List your own room and earn.
            </p>
            <Link href="/rooms" className="btn-primary mt-8 inline-flex">
              Explore Rooms
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Rooms */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="heading-section">Available Study Rooms</h2>
          <p className="mt-3 text-muted">Discover the latest spaces added to our library</p>
        </div>

        {loading ? (
          <LoadingSpinner fullPage />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestRooms.map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <RoomCard room={room} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/rooms" className="btn-secondary">
            View All Rooms
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 dark:bg-card-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="heading-section">How StudyNook Works</h2>
            <p className="mt-3 text-muted">Three simple steps to your ideal study session</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Browse Rooms",
                desc: "Explore available study rooms filtered by amenities, floor, and price to find your perfect match.",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Book a Time Slot",
                desc: "Pick your date and hourly time slot. See the total cost calculated instantly before confirming.",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Study & Earn",
                desc: "Enjoy your booked room. Have extra space? List it on StudyNook and earn from fellow students.",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="card-base p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                  {item.icon}
                </div>
                <span className="mt-4 block font-display text-sm font-bold text-accent">
                  Step {item.step}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-primary dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "50+", label: "Study Rooms" },
              { value: "1,200+", label: "Bookings Made" },
              { value: "800+", label: "Active Students" },
              { value: "4.8★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-accent md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
