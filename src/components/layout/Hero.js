'use client'

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Right from "../icons/Right";
import Link from "next/link";
import { gsap } from "gsap";

export default function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Enhanced GSAP animation for the brownie image
            gsap.fromTo(
                ".brownie-image",
                { opacity: 0, scale: 0, rotate: -180, y: -100 }, // Initial state
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    y: 0,
                    duration: 2.5,
                    ease: "elastic.out(1, 0.5)" // Bouncy effect
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero mt-4">
            <div className="py-8 md:py-12">
                <h1 className="text-4xl font-semibold">
                    Life is <br />
                    sweeter <br />
                    with a&nbsp;
                    <span className="text-primary">Brownie</span>
                </h1>
                <p className="my-6 text-gray-500 text-sm">
                    Brownies are the perfect blend of sweetness and joy, making every moment richer and more delightful.
                </p>
                <div className="flex gap-4 text-sm items-center">
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

            <div className="relative hidden md:block" ref={containerRef}>
                <Image
                    src={'/spinner-logo.png'}
                    layout={'fill'}
                    objectFit={'contain'}
                    alt="Brownie"
                    className="brownie-image" // Add a class for targeting
                />
            </div>
        </section>
    );
}
