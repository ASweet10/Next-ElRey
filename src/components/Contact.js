import React from 'react'
import { LuCrown } from "react-icons/lu"

const Contact = () => {
  return (
    <section className="app__graniteBg text-center pt-40" id="contact">
        <div className="py-4 flex flex-col items-center">
            <LuCrown className="text-7xl text-white" />
            <h4 className="text-3xl font-bold text-white">El Rey</h4>
        </div>
        <h3 className="uppercase text-white text-5xl font-bold ">Contact Us</h3>
        <div className="text-gray-500 md:text-xl max-w-2xl mx-auto mt-8 mb-40 flex flex-col gap-4">
            <p>82 S Acacia St, San Antonio TX 78112</p>
            <p>(555) 663-8892</p>
            <p>info@elreysanantonio.com</p>
        </div>

        <div className="border-t p-8 text-center text-gray-500 mt-8">
            &copy; 2024 El Rey Restaurant. All rights reserved
        </div>
    </section>
  )
}

export default Contact