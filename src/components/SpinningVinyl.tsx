"use client";

export default function SpinningVinyl() {
  return (
    <a
      href="https://open.spotify.com/playlist/1IHNyScnBS5w065eRh3HBs"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
    >
      <div className="relative w-12 h-12">
        {/* Vinyl record */}
        <div className="w-12 h-12 rounded-full bg-[#1a1a1a] group-hover:animate-spin-slow flex items-center justify-center shadow-lg">
          {/* Grooves */}
          <div className="absolute inset-1 rounded-full border border-[#333]" />
          <div className="absolute inset-2 rounded-full border border-[#2a2a2a]" />
          <div className="absolute inset-3 rounded-full border border-[#333]" />
          {/* Center label */}
          <div className="w-4 h-4 rounded-full bg-[#1DB954]" />
          {/* Center hole */}
          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
        </div>
      </div>
      <span className="text-sm">Vibe with me on Spotify</span>
    </a>
  );
}
