"use client";

import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export default function NotFound() {
  return (
    <>
      <PageTitle title="StudyNook – Page Not Found" />
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-8xl font-bold text-accent">404</p>
        <h1 className="mt-4 heading-section">Page Not Found</h1>
        <p className="mt-3 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back to Home
        </Link>
      </div>
    </>
  );
}
