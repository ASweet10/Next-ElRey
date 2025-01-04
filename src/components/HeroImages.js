'use client'
import React, { useState } from 'react'
import Image from "next/image"

export default function HeroImages() {

    const panelImages = [
        { 
            id: 0,
            src: '/panel-mariachi.jpg',
            title: 'Daily Live Mariachi Performances',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cta: 'Meet the Band',  
        },
        { 
            id: 1,
            src: '/panel-appetizer.jpg',
            title: 'Many Classic Appetizers',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cta: 'Order Now',  
        },
        { 
            id: 2,
            src: '/panel-wine.jpg',
            title: 'Browse our list of wine and spirits',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cta: 'See list', 
        },
        { 
            id: 3,
            src: '/panel-parade.jpg',
            title: 'Inspired by Tradition',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cta: 'Learn More',  
        },
    ]

    return (
        <section className="w-full pt-8 app__graniteBg md:pt-0">    
            { panelImages.map((image) => {
                return (
                    <div className='w-full relative overflow-hidden h-[25vh] md:h-[50vh]' key={image.id}>
                        <div className='absolute w-full md:w-1/2 top-10 md:top-1/4 md:left-24 group'>
                            <h1 className='text-white text-center md:text-start text-3xl md:text-5xl font-cormorant font-semibold group-hover:cursor-pointer'>{image.title}</h1>
                            <h1 className='group-hover:cursor-pointer hidden md:flex md:mt-4 text-xl'>{image.description}</h1>
                            <div className='hidden md:flex justify-start items-center mt-8 group gap-4'>
                                <div className='border-[1px] border-yellow-400 w-20 group-hover:w-32 duration-300 group-hover:cursor-pointer'></div>
                                <h1 className='group-hover:w-40 font-cormorant text-yellow-400 text-xl font-bold group-hover:cursor-pointer'>{image.cta}</h1>
                            </div>
                        </div>
                        <Image src={image.src} alt='.' width={1920} height={200} className='w-full -top-1/2' />
                    </div>
                )
            })}
        </section>
    )
}