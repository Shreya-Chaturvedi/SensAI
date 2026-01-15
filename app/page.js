import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <>
      {/* subtle background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-950 via-black to-slate-950" />

      {/* HERO */}
      <HeroSection />

      {/* FEATURES */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Everything You Need to Succeed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="
                  relative group
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  rounded-2xl p-6
                  hover:-translate-y-2
                  hover:shadow-[0_25px_50px_rgba(99,102,241,0.25)]
                  transition-all
                "
              >
                <div className="mb-4 text-indigo-400">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24">
        <div
          className="
          max-w-5xl mx-auto
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-3xl
          grid grid-cols-2 md:grid-cols-4
          text-center divide-x divide-white/10
        "
        >
          {[
            ["50+", "Industries"],
            ["1000+", "Interview Questions"],
            ["95%", "Success Rate"],
            ["24/7", "AI Support"],
          ].map(([value, label], i) => (
            <div key={i} className="py-10">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {value}
              </h3>
              <p className="text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground">
              A simple, guided journey to career confidence
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            {howItWorks.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="text-indigo-400 font-bold text-2xl">
                  0{index + 1}
                </div>
                <div
                  className="
                  relative group
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  rounded-2xl p-6
                  hover:-translate-y-2
                  hover:shadow-[0_25px_50px_rgba(99,102,241,0.25)]
                  transition-all flex-1
                "
                >
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Loved by Learners
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonial.map((t, index) => (
              <div
                key={index}
                className="relative group
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  rounded-2xl p-6
                  hover:-translate-y-2
                  hover:shadow-[0_25px_50px_rgba(99,102,241,0.25)]
                  transition-all
                  
                "
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={t.image}
                    width={48}
                    height={48}
                    alt={t.author}
                    className="rounded-full border"
                  />
                  <div>
                    <p className="font-semibold">{t.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </div>

                <p className="italic text-muted-foreground">“{t.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">Everything you need to know</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div
          className="
          max-w-5xl mx-auto
          bg-gradient-to-r from-blue-600 to-green-600
          rounded-3xl p-16 text-center
        "
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Level Up Your Career?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Practice smarter, prepare faster, and track your growth with AI.
          </p>

          <Link href="/dashboard">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white/10 text-white hover:bg-white/20 px-8"
            >
              Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
