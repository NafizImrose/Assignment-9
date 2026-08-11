"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import LoadingSpinner from "@/components/LoadingSpinner";
import BookingModal from "@/components/BookingModal";
import EditRoomModal from "@/components/EditRoomModal";
import ConfirmModal from "@/components/ConfirmModal";
import { useAuth } from "@/context/AuthContext";
import { getRoomById, formatCapacity } from "@/lib/mockData";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RoomDetailsPage() {
  const { data: session, isPending } = authClient.useSession();

  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = getRoomById(id);
      setRoom(found || null);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  const isOwner = user && room && room.ownerId === user.id;

  const handleDelete = () => {
    toast.success("Room deleted successfully");
    router.push("/my-listings");
  };

  if (loading) return <LoadingSpinner fullPage size="lg" />;

  if (!room) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
        <PageTitle title="StudyNook – Room Not Found" />
        <h1 className="heading-section">Room Not Found</h1>
        <p className="mt-2 text-muted">
          This room may have been removed or doesn&apos;t exist.
        </p>
        <Link href="/rooms" className="btn-primary mt-6">
          Back to Rooms
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageTitle title={`StudyNook – ${room.name}`} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96 lg:h-full lg:min-h-[400px]">
            <Image
              src={room.image}
              alt={room.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="heading-section">{room.name}</h1>
                <p className="mt-1 text-sm text-muted">{room.floor}</p>
              </div>
              <div className="rounded-xl bg-accent/20 px-4 py-2 text-center">
                <p className="font-display text-2xl font-bold text-primary dark:text-accent">
                  ${room.hourlyRate}
                </p>
                <p className="text-xs text-muted">per hour</p>
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">
              {room.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="card-base p-4 text-center">
                <p className="text-2xl font-bold text-primary dark:text-accent">
                  {room.bookingCount}
                </p>
                <p className="text-xs text-muted">Total Bookings</p>
              </div>
              <div className="card-base p-4 text-center">
                <p className="text-2xl font-bold text-primary dark:text-accent">
                  {room.capacity}
                </p>
                <p className="text-xs text-muted">Max Capacity</p>
              </div>
              <div className="card-base col-span-2 p-4 text-center sm:col-span-1">
                <p className="text-sm font-bold text-primary dark:text-accent">
                  {formatCapacity(room.capacity)}
                </p>
                <p className="text-xs text-muted">Seating</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 font-display text-lg font-bold text-primary dark:text-white">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-accent/20 dark:text-accent"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {session ? (
                <button
                  onClick={() => setShowBooking(true)}
                  className="btn-primary"
                >
                  Book Now
                </button>
              ) : (
                <Link href="/login" className="btn-primary">
                  Login to Book
                </Link>
              )}

              {isOwner && (
                <>
                  <button
                    onClick={() => setShowEdit(true)}
                    className="btn-secondary"
                  >
                    Edit Room
                  </button>
                  <button
                    onClick={() => setShowDelete(true)}
                    className="btn-danger"
                  >
                    Delete Room
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        room={room}
      />

      {isOwner && (
        <>
          <EditRoomModal
            isOpen={showEdit}
            onClose={() => setShowEdit(false)}
            room={room}
            onSave={(updated) => setRoom({ ...room, ...updated })}
          />
          <ConfirmModal
            isOpen={showDelete}
            onClose={() => setShowDelete(false)}
            title="Delete Room"
            message="Are you sure you want to permanently delete this room? This action cannot be undone."
            confirmText="Delete"
            danger
            onConfirm={handleDelete}
          />
        </>
      )}
    </>
  );
}
