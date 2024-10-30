'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from "next/image"
import Link from "next/link"
import { FaRegArrowAltCircleRight } from "react-icons/fa"

export default function Hero() {
    const [ videoIndex, setVideoIndex ] = useState(0)
    const videoRefs = useRef([])
    const videoSources = [
        '/hero_grill.mp4',
        '/hero_ingredients.mp4',
        'hero_tortillas.mp4',
        '/hero_friends.mp4',
        'hero_barbecue.mp4',
    ]

    useEffect(() => {
        const video = videoRefs.current[videoIndex]
        video.play()

        video.onended = () => {
            const nextIndex = ( videoIndex + 1) % videoSources.length
            setVideoIndex(nextIndex)
        }
    }, [videoIndex])

    return (
        <section className="md:pt-4">
            <div className="relative w-full h-[500px]">
                { videoSources.map((src, index) => (
                    <video key={index} ref={element => (videoRefs.current[index] = element)} src={src} muted
                        style={{
                            display: index === videoIndex ? 'block' : 'none',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                ))}
            </div>
            <div className="pt-12 text-center mx-6 md:mx-40">
                <h1 className="text-4xl font-semibold leading-normal">Your day just got a whole lot better</h1>
                <p className="my-4 text-gray-500">Try our award-winning burritos, tacos, and homemade salsas. Plus soups and sides made to order and 6 different sauces. The possibilities are endless!</p>
                <div className="flex gap-4 justify-center">
                    <Link href={'/menu'} 
                        className="bg-primary text-white font-semibold px-8 py-4 rounded-full flex items-center gap-2"
                    >
                        Menu
                        <FaRegArrowAltCircleRight className='text-xl' />
                    </Link>
                    <Link href={'/about'} 
                        className="bg-slate-800 text-white px-4 py-2 md:py-4 rounded-full flex items-center gap-2 font-semibold"
                    >
                        Learn more
                        <FaRegArrowAltCircleRight className='text-xl' />
                    </Link>
                </div>
            </div>
            {/* <div className="relative md:block">
                <Image src='/nachos.jpg' layout='responsive' width={500} height={300} className="object-contain rounded-lg" alt='Burrito' />
            </div> */}
        </section>
    )
}