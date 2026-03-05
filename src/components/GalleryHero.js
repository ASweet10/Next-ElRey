'use client'
import React, { useState } from 'react'
import Image from "next/image"
import { AnimatePresence, motion } from 'framer-motion'
import Modal from './GalleryHeroModal'

const GalleryRow = ({ images, startIndex, onImageClick }) => (
    <div className='flex flex-col md:flex-row w-full border-b border-white/10'>
        <div className='w-full md:w-2/5 relative overflow-hidden aspect-square md:aspect-auto cursor-pointer group'
            onClick={() => onImageClick(startIndex)}
        >
            <Image src={images[startIndex].src} fill alt='Gallery item'
                className="object-cover scale-101 opacity-90 transition-transform duration-300 ease-out group-hover:scale-105 transform-gpu will-change-transform"
            />
        </div>

        <div className='w-full md:w-3/5 grid grid-cols-3'>
            {images.slice(startIndex + 1, startIndex + 7).map((item, idx) => (
                <div key={idx} onClick={() => onImageClick(startIndex + 1 + idx)}
                    className="relative overflow-hidden aspect-square cursor-pointer group"
                >
                    <Image src={item.src} fill alt='Gallery item'
                        className="object-cover scale-101 opacity-90 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:opacity-100 will-change-transform" 
                    />
                </div>
            ))}
        </div>
    </div>
)

export default function GalleryHero() {
    const [selectedId, setSelectedId] = useState(null)

    const imageGallery = [
        { id: 0, src: '/steak.jpg'},
        { id: 1, src: '/tacos3.jpg'},
        { id: 2, src: '/tacos6.jpg'},
        { id: 3, src: '/tacos4.jpg'},
        { id: 4, src: '/tacos5.jpg'},
        { id: 5, src: '/nachos2.jpg'},
        { id: 6, src: '/tacos3.jpg'},
        { id: 7, src: '/tacos1.jpg'},
        { id: 8, src: '/tacos4.jpg'},
        { id: 9, src: '/tacos2.jpg'},
        { id: 10, src: '/tacos6.jpg'},
        { id: 11, src: '/salsa.jpg'},
        { id: 12, src: '/nachos2.jpg'},
        { id: 13, src: '/steak.jpg'},
    ]

    return (
        <section className="pt-12 md:pt-0">    
            <div className='-m-[1px]'>
                <GalleryRow images={imageGallery} startIndex={0} onImageClick={setSelectedId} />
            </div>
            <div className='-m-[1px]'>
                <GalleryRow images={imageGallery} startIndex={7} onImageClick={setSelectedId} />
            </div>

            <AnimatePresence>
                {selectedId !== null && (
                    <Modal 
                        images={imageGallery} 
                        index={selectedId} 
                        setIndex={setSelectedId} 
                        close={() => setSelectedId(null)} 
                    />
                )}
            </AnimatePresence>
        </section>
    )
}