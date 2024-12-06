'use client'

import React from "react";
import Right from "../icons/Right";
import Link from "next/link";
import { AnimatedTestimonialsHero } from "./AnimatedTestimonialsHero";

export default function Hero() {
    return (
        <section className="hero mt-4 flex flex-col md:flex-row items-center gap-8">
            {/* Text Section */}
            <div className="py-8 md:py-12 w-full text-center md:text-left">
                <h1 className="text-4xl font-semibold leading-tight">
                    Elevate Your Style <br />
                    with Timeless <br />
                    <span className="text-primary">Menswear</span>
                </h1>
                <p className="my-6 text-gray-500 text-sm md:text-base">
                    Discover the perfect blend of sophistication and comfort, designed for the modern man who knows what he wants.
                </p>
                <div className="flex gap-4 text-sm items-center justify-center md:justify-start">
                    <button className="bg-primary text-white px-4 py-2 rounded-full flex gap-2 uppercase items-center justify-center">
                        <Link href={'/menu'}>Order Now</Link>
                        <Right />
                    </button>
                    <button className="py-2 border-0 flex gap-2 text-gray-600 font-semibold items-center">
                        <Link href={'/#about-us'}>Learn More</Link>
                        <Right />
                    </button>
                </div>
            </div>

            {/* Testimonials Section */}
            <AnimatedTestimonialsHero className="w-full mt-8 md:mt-0" />
        </section>
    );
}
