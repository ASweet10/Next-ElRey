import React from 'react'
import { LuCrown } from "react-icons/lu"

const Contact = () => {
  return (
    <section className="text-center pt-40" id="contact">
        <div className="py-4 flex flex-col items-center">
            <LuCrown className="text-7xl text-gray-800" />
            <h4 className="text-3xl font-bold text-gray-800">El Rey</h4>
        </div>
        <h3 className="uppercase text-gray-800 text-5xl font-bold">Contact Us</h3>
        <div className="text-gray-800 md:text-xl max-w-2xl mx-auto mt-4 mb-32 flex flex-col gap-4">
            <p>82 S Acacia St, San Antonio TX 78112</p>
            <p>(555) 663-8892</p>
            <p>info@elreysanantonio.com</p>
        </div>

        <div className="border-t p-8 text-center text-gray-800 mt-8">
            &copy; 2025 El Rey Restaurant. All rights reserved
        </div>
    </section>
  )
}

export default Contact