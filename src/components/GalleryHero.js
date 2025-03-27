'use client'
import React from 'react'
import Image from "next/image"

export default function GalleryHero() {
    
    const galleryOne = [
        { id: 0, src: '/steak.jpg',},
        { id: 1, src: '/tacos3.jpg',},
        { id: 2, src: '/nachos.jpg',},
        { id: 3, src: '/tacos4.jpg',},
        { id: 4, src: '/tacos5.jpg',},
        { id: 5, src: '/nachos2.jpg',},
    ]

    return (
        <section className="app__graniteBg pt-12 md:pt-0">    
            <div className='flex flex-col md:flex-row w-full'>
                <div className='w-full md:w-2/5'>
                    <div className="relative overflow-hidden">
                        <Image src='/tacos1.jpg' layout='responsive' width={500} height={200} alt='Burrito'
                            className="object-contain hover:scale-105 duration-200 hover:cursor-pointer opacity-85 hover:opacity-100"
                        />
                    </div>
                </div>

                <div className='w-full md:w-3/5 grid grid-cols-2 md:grid-cols-3'>
                    {galleryOne.map((item) => {
                        return(
                            <div className="relative overflow-hidden" key={item.id}>
                                <Image src={item.src} layout='responsive' width={500} height={200} alt='Burrito'
                                    className="object-contain hover:scale-105 duration-200 hover:cursor-pointer opacity-85 hover:opacity-100" 
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='flex flex-col md:flex-row w-full'>
                <div className='w-full md:w-2/5'>
                    <div className="relative overflow-hidden">
                        <Image src='/tacos2.jpg' layout='responsive' width={500} height={200} alt='Burrito'
                            className="object-contain hover:scale-105 duration-200 hover:cursor-pointer opacity-85 hover:opacity-100" 
                        />
                    </div>
                </div>
                <div className='w-full md:w-3/5 grid grid-cols-2 md:grid-cols-3'>
                    {galleryOne.map((item) => {
                        return(
                            <div className="relative overflow-hidden" key={item.id}>
                                <Image src={item.src} layout='responsive' width={500} height={200}  alt='Burrito'
                                    className="object-contain hover:scale-105 duration-200 hover:cursor-pointer opacity-85 hover:opacity-100"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

        </section>
    )
}