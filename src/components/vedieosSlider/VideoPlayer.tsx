"use client";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type Props = {
  src: string;
  isActive: boolean;
  onEnded: () => void;
};

export default function VideoPlayer({ src, isActive, onEnded }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const player = videojs(videoRef.current, {
      controls: false,
      autoplay: false,
      muted: true,
      loop: false,
      playsinline: true,
      preload: "auto",
      fluid: true,
    });

    playerRef.current = player;

    player.on("ended", onEnded);

    return () => {
      player.off("ended", onEnded);
      player.dispose();
    };
  }, [onEnded]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    if (isActive) {
      player.play().catch(() => {});
    } else {
      player.pause();
      player.currentTime(0);
    }
  }, [isActive]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
