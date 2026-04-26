"use client";

import { useEffect, useRef, useState } from "react";
import { ImageComponent } from "../../../ui/Image";

export function LoginBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 728) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    setIsDesktop(true);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const video = videoRef.current;
    if (!video) return;

    video.src = "/login/background-video-login.mp4";
    video.load();

    video.oncanplay = () => {
      video.playbackRate = 0.5;
      video.play().catch(() => {});
    };
  }, [isDesktop]);

  return (
    <>
      <ImageComponent
        classNameWrapper="lg:hidden absolute h-full"
        src={"/login/background-mobile.webp"}
        priority
        alt=""
      />

      {isDesktop && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="hidden lg:block absolute inset-0 w-full h-full object-fill"
        />
      )}

      <div className="w-full md:h-dvh h-full absolute inset-0 bg-linear-to-l from-background-main via-background-main/90 to-background-main/80" />
    </>
  );
}
