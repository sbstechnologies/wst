"use client";

interface TourSchedulerProps {
  open: boolean;
  onClose: () => void;
}

export default function TourScheduler({ open, onClose }: TourSchedulerProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 md:flex md:items-center md:justify-center md:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
      relative
      h-[100dvh]
      w-full
      bg-white
      md:h-[90vh]
      md:max-w-6xl
      md:rounded-2xl
      md:overflow-hidden
      md:shadow-2xl
    "
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="
    absolute
    right-3
    top-3
    z-20
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-full
    bg-[#1E3872]
    text-white
    shadow-lg
    transition
    hover:bg-[#162C5A]
  "
        >
          ✕
        </button>

        {/* Scheduler */}
        <iframe
          src="https://charles.rentbamboo.com/embed/schedule?clientId=bamboo_1l359uhj&color=1E3872&
propertyId=39cd9772-ea30-4ea8-b2a1-759c9c9c9e5d"
          width="100%"
          height="720"
          className="h-full w-full border-0"
          loading="lazy"
          title="Schedule a tour"
        ></iframe>
      </div>
    </div>
  );
}
