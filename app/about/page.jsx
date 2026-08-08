"use client";

import PageTitle from "@/components/PageTitle";

export default function AboutPage() {
  return (
    <>
      <PageTitle title="StudyNook – About" />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="heading-primary">About StudyNook</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            StudyNook is a modern platform designed to connect university students
            with private study rooms in their library. Whether you need a quiet corner
            for focused work or a collaborative space for group projects, we make
            finding and booking the perfect room effortless.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="card-base p-8">
            <h2 className="font-display text-xl font-bold text-primary dark:text-white">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-muted">
              We believe every student deserves access to a productive study environment.
              StudyNook bridges the gap between room owners and students seeking quality
              study spaces, creating a community-driven ecosystem within university libraries.
            </p>
          </div>
          <div className="card-base p-8">
            <h2 className="font-display text-xl font-bold text-primary dark:text-white">For Room Owners</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Have a private study room in your library? List it on StudyNook and earn
              while helping fellow students. Set your own hourly rate, manage availability,
              and track bookings from your personal dashboard.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-primary p-8 text-center text-white sm:p-12">
          <h2 className="font-display text-2xl font-bold text-accent">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-lg text-white/80">
            Join hundreds of students already using StudyNook to find their ideal study space.
          </p>
        </div>
      </div>
    </>
  );
}
