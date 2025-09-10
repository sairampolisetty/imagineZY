import React, { useState } from "react";

const Card = ({ photo, prompt, name }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  // Whether device is mobile-sized (handles SSR too)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  // Click/tap: toggle prompt ON MOBILE ONLY
  const handleCardClick = () => {
    if (isMobile) setShowPrompt(v => !v);
  };

  // Hide overlay on any scroll/tap outside on mobile (optional enhancement)
  // Not included here for brevity, but trivial to add with useEffect.

  return (
    <div
      className="relative group rounded-xl shadow-md overflow-hidden bg-white cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
    >
      <img
        src={photo}
        alt={prompt}
        className="w-full object-cover aspect-square rounded-xl transition-transform duration-200 group-hover:scale-105"
        draggable={false}
      />

      {/* Overlay for prompt */}
      <div
        className={`
          absolute inset-0 flex items-end sm:items-center justify-center
          bg-gradient-to-t from-black/80 via-black/60 to-transparent
          px-3 pb-3 sm:pb-0 sm:bg-black/75
          rounded-xl
          transition-all
          duration-300
          ${isMobile
            ? (showPrompt ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none")
            : "opacity-0 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:pointer-events-auto translate-y-6"
          }
        `}
        style={{
          zIndex: 2,
          // On large screens: show prompt centered, on mobile push it up from bottom
        }}
      >
        <span
          className="block w-full text-center text-base font-medium text-white drop-shadow-md select-none"
          style={{
            // Optional: maxHeight: '70%', overflowY: 'auto'
          }}
        >
          {prompt}
        </span>
      </div>

      {/* Attribution: User name at bottom left */}
      <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 rounded text-xs font-semibold text-white pointer-events-none z-10 shadow-lg">
        {name}
      </div>
    </div>
  );
};

export default Card;
