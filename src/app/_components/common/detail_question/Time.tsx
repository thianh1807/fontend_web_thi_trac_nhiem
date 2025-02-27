"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";

export default function Time({
  _setTime,
  _time,
}: {
  _setTime: (time: number | ((prevTime: number) => number)) => void;
  _time: number;
}) {
  // Format time into HH:MM:SS or MM:SS
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [
      ...(hours > 0 ? [hours.toString()] : []),
      minutes.toString().padStart(2, "0"),
      remainingSeconds.toString().padStart(2, "0"),
    ].join(":");
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (_time === undefined || _time < 0) return;

    const timer = setInterval(() => {
      _setTime((prevTime: any) => {
        const newTime = Math.max(0, prevTime - 1);
        sessionStorage.setItem("time_exam", newTime.toString());

        if (newTime === 0) {
          clearInterval(timer);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [_setTime]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg shadow-lg mb-6">
      <div className="flex items-center justify-center">
        <div className="bg-white px-14 py-2 rounded-full">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {formatTime(_time)}
          </span>
        </div>
      </div>
    </div>
  );
}
