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
                    <h2 className="text-4xl md:text-6xl text-primary">Our Best Sellers</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {bestSellers?.length > 0 && bestSellers.map(item => (
                        <div key={item._id}>
                            <MenuItem { ...item } />
                        </div>
                    ))}
                </div>
            </section>

            <section className="text-center pt-20" id="contact">
                <div className="py-4 flex flex-col items-center">
                    <LuCrown className="text-7xl text-white" />
                    <h4 className="text-3xl font-bold text-white">El Rey</h4>
                </div>
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