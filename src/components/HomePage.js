'use client'
import MenuItem from "./MenuItem"
import Image from "next/image"
import { useEffect, useState } from "react"
import Chef from "./Chef"
import VideoHero from "./VideoHero"
import Hero from "./Hero"
import Link from "next/link"
import Contact from "./Contact"
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import HeroImages from "./HeroImages"

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
        <div className="">
            <Hero />
            <HeroImages />
            <section className="py-16">
                <div className="text-center pb-10">
                    <h1 className="text-xl text-gray-400">Check Out</h1>
                    <h1 className='text-yellow-600 text-5xl capitalize font-cormorant'>Our Best Sellers</h1>
                </div>
                <div className="grid md:grid-cols-4 gap-12 md:gap-0">
                    {bestSellers?.length > 0 && bestSellers.slice(1, 5).map(item => (
                        <div key={item._id}>
                            <MenuItem { ...item } />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <Link href={'/menu'} 
                        className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-2"
                    >
                        Full Menu
                        <FaRegArrowAltCircleRight className='text-xl' />
                    </Link>
                </div>

            </section>


            <Chef />
            <VideoHero />
            <Contact />
        </div>
    )
}