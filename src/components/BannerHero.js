'use client'
import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import { motion } from 'framer-motion'

const BannerHero = ({
    title,
    subtitle,
    description,
    imageSrc,
    buttonText,
    buttonLink,
    reverse = false,
    animationType = 'side' // 'side' for first row, 'bottom' for second
}) => {
  // Define animation variants
  const textVariants = {
    hidden: { opacity: 0, x: reverse ? 50 : -50, y: animationType === 'bottom' ? 50 : 0 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, x: reverse ? -50 : 50, y: animationType === 'bottom' ? 80 : 0 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
    }
  }

  return (
    <section className="overflow-hidden">
        <div className={`flex flex-col md:flex-row items-center min-h-[70vh] gap-12 md:gap-20 px-6 md:px-20 py-10 ${reverse ? 'md:flex-row-reverse' : ''}`}>

            <motion.div variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col items-center text-center md:w-1/2 font-oswald"
            >
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-gray-900 leading-none">{title}</h1>
                
                <div className="mt-6 mb-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 border-b-2 border-gray-800 inline-block pb-1">
                    {subtitle}
                    </h2>
                </div>

                <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                    {description}
                </p>

                {buttonText && (
                    <Link href={buttonLink} className="mt-10 bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-md transition-colors uppercase tracking-widest">
                        {buttonText}
                    </Link>
                )}
                </motion.div>

                {/* Image Content */}
                <motion.div 
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full md:w-1/2 relative aspect-[4/3] shadow-2xl"
                >
                <Image src={imageSrc} fill className="object-cover rounded-sm" alt={title} />
            </motion.div>
            {/*
            <div className='flex flex-col items-center md:w-1/2 order-2 md:order-1'>
                <h1 className="text-4xl md:text-6xl font-semibold leading-normal uppercase text-gray-800">Our Menu</h1>
                <h2 className="my-4 text-gray-700 text-base md:text-xl mx-4 md:mx-24">Award-winning burritos and homemade salsas</h2>
                <h2 className='text-gray-800 text-base md:text-lg'>Plus tacos, enchiladas, and sides made to order.</h2>
                <div className="flex gap-4 justify-center mt-8">
                    <Link href={'/menu'}
                        className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold text-xl px-6 py-3 rounded-md flex items-center gap-2 uppercase"
                    >
                        View Menu
                    </Link>
                </div> 
            </div>

            <div className="w-full md:w-1/2 relative order-1 md:order-2">
                <Image src='/salsa.jpg' layout='responsive' width={0} height={0} className="rounded-sm" alt='Burrito' />
            </div>
            */}
        </div>
    </section>
  )
}

export default BannerHero