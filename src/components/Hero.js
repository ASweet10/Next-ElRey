import React from 'react'
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import Link from "next/link"
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="app__graniteBg text-center min-h-[100vh]">
        <div className='flex flex-col md:flex-row mx-16 md:mx-28 pt-28 gap-20 items-center'>
            <div className='flex flex-col items-center md:w-1/2'>
                <h1 className="text-4xl md:text-5xl font-bold font-cormorant leading-normal">Mexican Street Food Done Right</h1>
                <p className="my-4 text-gray-300 text-base md:text-lg">Try our award-winning burritos, tacos, and homemade salsas. Plus soups and sides made to order and 6 different sauces. The possibilities are endless!</p>
                <div className="flex gap-4 justify-center mt-8">
                    <Link href={'/menu'}
                        className="bg-yellow-700 hover:bg-yellow-600 text-white font-semibold px-3 py-1 rounded-full flex items-center gap-2 font-cormorant"
                    >
                        Menu
                        <FaRegArrowAltCircleRight className='text-lg' />
                    </Link>
                    <Link href={'/about'} 
                        className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-3 rounded-full flex items-center gap-2 font-semibold font-cormorant"
                    >
                        Learn more
                        <FaRegArrowAltCircleRight className='text-lg' />
                    </Link>
                </div> 
            </div>

            <div className="md:w-1/2 relative">
                <Image src='/nachos.jpg' layout='responsive' width={400} height={200} className="object-contain rounded-lg" alt='Burrito' />
            </div>
        </div>
    </div>
  )
}

export default Hero