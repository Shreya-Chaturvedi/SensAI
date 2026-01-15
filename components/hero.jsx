"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const card = imageRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -12;
      const rotateY = (x / rect.width - 0.5) * 12;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
      `;
    };

    const resetTilt = () => {
      card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", resetTilt);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", resetTilt);
    };
  }, []);

  return (
    <section className="w-full pt-32 md:pt-40 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* LEFT CONTENT */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl gradient-title animate-gradient">
              Prepare Smarter for Your Next Career Move
            </h1>

            <p className="max-w-xl mx-auto md:mx-0 text-muted-foreground md:text-xl">
              From resumes and cover letters to ATS checks, industry insights,
              interview tests, and AI mock interviews — train, track, and
              improve with confidence.
            </p>

            <div className="flex justify-center md:justify-start">
              <Link href="/dashboard">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center">
            <div
              ref={imageRef}
              className="hero-tilt relative before:absolute before:inset-0 before:rounded-xl before:bg-blue-500/10 before:blur-2xl before:-z-10"
            >
              <Image
                src="/bannerAI.png"
                width={700}
                height={700}
                alt="AI Career Assistant"
                className="rounded-xl shadow-2xl border"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
