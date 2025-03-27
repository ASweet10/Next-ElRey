'use client'
import MenuItem from "./MenuItem"
import { useEffect, useState } from "react"
import Chef from "./Chef"
import VideoHero from "./VideoHero"
import BannerHero from "./BannerHero"
import Link from "next/link"
import Contact from "./Contact"
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import GalleryHero from "./GalleryHero"

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
            <VideoHero />
            <BannerHero />
            <GalleryHero />


            <section className="app__graniteBg pt-32 md:pt-40">
                <div className="text-center pb-16">
                    <h1 className='text-yellow-600 text-6xl capitalize font-cormorant'>Our Best Sellers</h1>
                </div>
                <div className="grid md:grid-cols-4 gap-12 md:gap-0">
                    {bestSellers?.length > 0 && bestSellers.slice(1, 5).map(item => (
                        <div key={item._id} className="text-white">
                            <MenuItem { ...item } />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-28">
                    <Link href={'/menu'} 
                        className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold text-xl px-4 py-3 rounded-md flex items-center gap-2 font-cormorant"
                    >
                        Full Menu
                        <FaRegArrowAltCircleRight className='text-xl' />
                    </Link>
                </div>

            </section>


            <Chef />

            <Contact />
        </div>
    )
}