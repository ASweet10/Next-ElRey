'use client'
import React, { useState, useEffect, useRef } from 'react'

export default function VideoHero() {
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
        <section className="">
            <div className="relative w-full h-[500px] md:h-[920px]">
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
        </section>
    )
}