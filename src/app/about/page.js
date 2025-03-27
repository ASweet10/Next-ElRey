'use client'
import Image from "next/image"
import { useState } from "react"
import { LuCrown } from "react-icons/lu"

export default function AboutPage () {

    return (
        <div className="app__graniteBg">
            <div className="relative w-full h-[400px] md:h-[600px]">
                <Image src='/hero-fire.jpg' layout='fill' objectFit="cover" priority={true} alt='hero' />
                <div className="absolute top-2/3 md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center ">
                    <h2 className="uppercase text-white text-6xl md:text-7xl font-bold drop-shadow-lg">Serious Heat</h2>
                </div>
            </div>
            <div className="text-gray-200 md:max-w-6xl py-20 mx-auto flex flex-col gap-20 items-center text-center p-4">
                <h4 className="text-3xl font-semibold uppercase">
                    We're all about the flavor. That's why we prepare everything daily in-house and avoid taking shortcuts.
                </h4>
                <div className="flex flex-col gap-6 md:flex-row items-center">
                    <Image src={'/about.jpg'} width={400} height={300} alt="about" className="relative w-full md:w-1/2 rounded-lg" />
                    <p className="text-xl md:w-1/2 order-2">
                        We work with local farmers to ensure our ingredients are as fresh as possible.
                        We receive daily shipments of produce and are constantly rotating our stock.
                    </p>
                </div>
                <div className="flex flex-col gap-6 md:flex-row items-center">
                    <Image src={'/steak.jpg'} width={400} height={300} alt="steak" className="relative w-full md:w-1/2 rounded-lg" />
                    <p className="text-xl md:w-1/2 order-2">
                        Our pork and steak are marinated and then slow-cooked for hours in our wood fired oven.
                        We enter yearly BBQ tournaments and have won multiple awards.
                    </p>
                </div>
                <div className="flex flex-col gap-6 md:flex-row items-center">
                    <Image src={'/catering.jpg'} width={400} height={300} alt="catering" className="relative w-full md:w-1/2 rounded-lg" />
                    <p className="text-xl md:w-1/2 order-2">We also offer catering for events of up to 50 people. Please contact management for more details.</p>
                </div>
                <p className="text-xl">We are more than willing to change our menu based on customer feedback. Feel free to share your ideas!</p>

                <div className="flex flex-col gap-6">
                    <h4 className="text-3xl font-semibold text-white">Hours</h4>
                    <p className="text-xl font-semibold">Sun, Mon, Tues, Wed, Thurs</p>
                    <p>10:00 AM - 8:00 PM</p>
                    <p className="text-xl font-semibold">Fri, Sat</p>
                    <p>11:00 AM - 10:00 PM</p>
                </div>
            </div>
        </div>
    )
}