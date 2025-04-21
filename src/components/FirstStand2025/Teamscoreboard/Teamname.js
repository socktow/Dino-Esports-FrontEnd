"use client";
import React from "react";

export default function Teamname({ isBlueTeam = false }) {
  const teamConfig = {
    name: isBlueTeam ? "Blue Team" : "Red Team",
    tag: isBlueTeam ? "BLU" : "RED",
    logo: "" // Có thể đặt logo mặc định nếu cần
  };

  return (
    <div
      className={`relative right-1 flex items-center ${
        isBlueTeam
          ? "text-white bg-[#1a2942] border-l-6 border-[#3c5069]"
          : "text-white bg-[#421a1a] border-l-6 border-[#693c3c]"
      } font-bold m-1 h-8`}
    >
      {teamConfig.logo && (
        <div className="flex-shrink-0 w-6 h-6 mx-2">
          <img
            src={teamConfig.logo}
            alt={`${teamConfig.tag} logo`}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <span className="flex-grow text-center">{teamConfig.tag}</span>
    </div>
  );
}
