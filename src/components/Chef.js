import React from 'react'
import Image from "next/image"
import { RiDoubleQuotesL } from "react-icons/ri"

const Chef = () => {
  return (
    <section className="app__graniteBg px-20 py-12 flex flex-col md:flex-row justify-between gap-4 items-center min-h-[100vh]">
        <div className="flex flex-1 w-full justify-center items-center">
            {/* <div className="bg-yellow-600 w-60 h-60 z-50 pl-40 pt-60"></div> */}
            <Image src="/chef.jpg" alt="chef" width={450} height={1000} />
        </div>

        <div className="flex flex-1 flex-col justify-center items-center md:items-start">
            <div className='m2-4 ml-2'>
                <p className='font-cormorant'>A word from the Chef</p>
            </div>

            <h1 className='text-yellow-600 text-5xl md:text-6xl capitalize font-cormorant'>Our Mission</h1>
            <div className="flex flex-col w-full mt-8 md:mt-20">
                <div className='flex justify-start items-end'>
                    <RiDoubleQuotesL className="text-white w-16 h-14" />
                    <p className='text-white font-normal capitalize text-base'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
                <p className='text-white font-normal capitalize text-base'>
                    Pellentesque venenatis enim hendrerit mi bibendum porttitor. 
                    Duis commodo, metus id mattis dignissim, leo lorem convallis sem, non feugiat sem nunc at nisi. Donec ut consequat augue. 
                    Phasellus at orci id orci blandit laoreet. Ut non dolor eu justo rutrum volutpat viverra nec enim. Ut eu gravida mi, in scelerisque libero. 
                    Cras dapibus vulputate semper. Sed suscipit erat ac dapibus pharetra. Nullam a pellentesque diam.
                </p>
            </div>

            <div className='w-full mt-12'>
                <p className='text-yellow-600 text-2xl font-cormorant'>Carlos Guzman</p>
                <p className='text-white font-normal capitalize text-sm'>Head Chef & Co-Founder</p>
                <Image src="/signature.png" alt="signature" width={200} height={100} className='md:mr-12' />
            </div>
        </div>
    </section>
  )
}

export default Chef