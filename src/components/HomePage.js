'use client'
import MenuItem from "./MenuItem"
import Image from "next/image"
import { useEffect, useState } from "react"
import { LuCrown } from "react-icons/lu"

export default function HomePage () {
    const [ bestSellers, setBestSellers ] = useState([])

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setBestSellers(menuItems.slice(-6)) // get only latest 3 items to start
            })
        })
    }, [])
    
    return (
        <div className="py-20">
            <section className="py-16">
                <div className="text-center pb-10">
                    <h1 className="text-2xl text-gray-400">Check Out</h1>
                    <h2 className="text-5xl md:text-6xl text-primary">Our Best Sellers</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {bestSellers?.length > 0 && bestSellers.map(item => (
                        <div key={item._id}>
                            <MenuItem { ...item } />
                        </div>
                    ))}
                </div>
            </section>

            <section className="text-center py-12" id="about">
                <h2 className="uppercase text-white text-5xl font-bold pb-3">Our Mission</h2>
                <div className="text-gray-500 md:max-w-6xl mx-auto flex flex-col gap-40 items-center">
                    <h4 className="text-3xl font-semibold">
                        We're all about the flavor
                    </h4>

                    <div className="flex flex-col gap-6 md:flex-row items-center">
                        <p className="text-2xl">
                            We source fresh ingredients from local farmers and prepare everything daily in-house.
                        </p>
                        <Image src={'/about.jpg'} width={600} height={400} alt="about"
                            className="relative w-full md:w-2/3"
                        />
                    </div>
                    <div className="flex flex-col gap-6 md:flex-row items-center">
                        <Image src={'/steak.jpg'} width={600} height={400} alt="steak"
                            className="relative w-full md:w-2/3"
                        />
                        <p className="text-2xl">
                        Our chicken and steak are slow-cooked for hours and have won multiple awards.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 md:flex-row items-center">
                        <p className="text-2xl">
                            We also offer catering for events of up to 50 people.
                        </p>
                        <Image src={'/catering.jpg'} width={600} height={400} alt="catering"
                            className="relative w-full md:w-2/3" 
                        />
                    </div>

                    <p className="text-xl md:text-3xl">
                        We are constantly rotating our menu based on customer feedback. Feel free to share your ideas!
                    </p>
                    <div className="pb-8 flex flex-col items-center">
                        <LuCrown className="text-7xl text-white" />
                        <h4 className="text-3xl font-semibold text-white">
                            The Flavor King
                        </h4>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h4 className="text-3xl font-semibold text-white">Hours</h4>
                        <p className="text-xl font-semibold">Sun, Mon, Tues, Wed, Thurs</p>
                        <p>10:00 AM - 8:00 PM</p>
                        <p className="text-xl font-semibold">Fri, Sat</p>
                        <p>11:00 AM - 10:00 PM</p>
                    </div>

                </div>
            </section>

            <section className="text-center pt-20" id="contact">
                <h3 className="uppercase text-white text-5xl font-bold ">Contact Us</h3>
                <div className="text-gray-500 md:text-xl max-w-2xl mx-auto mt-8 flex flex-col gap-4">
                    <p>82 West Park Street, San Antonio TX 78112</p>
                    <p>(555) 663-8892</p>
                    <p>info@elreysanantonio.com</p>
                </div>
            </section>
        </div>
    )
}