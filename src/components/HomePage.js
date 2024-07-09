'use client'
import MenuItem from "./MenuItem"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function HomePage () {
    const [ bestSellers, setBestSellers ] = useState([])

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setBestSellers(menuItems.slice(-3)) // get only latest 3 items to start
            })
        })
    }, [])
    
    return (
        <div className="py-20">
            <section className="">
                <div className="text-center">
                    <h1 className="text-lg text-gray-400">Check Out</h1>
                    <h2 className="text-5xl text-primary">Our Best Sellers</h2>
                </div>
                <div className="flex">
                    {bestSellers?.length > 0 && bestSellers.map(item => (
                        <div key={item._id}>
                            <MenuItem { ...item } />
                        </div>
                    ))}
                </div>
            </section>

            <section className="text-center py-12" id="about">
                <h3 className="uppercase text-white text-4xl font-bold ">About Us</h3>
                <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
                    <p className="">
                        We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor.
                        We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor.
                        We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor.
                    </p>
                    <p className="">
                        We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor.
                        We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor.
                        We are all about the flavor. We are all about the flavor. We are all about the flavor.
                    </p>
                    <p className="">
                        We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor.
                        We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor. We are all about the flavor.
                        We are all about the flavor. 
                    </p>
                </div>
            </section>

            <section className="text-center py-12" id="contact">
                <h3 className="uppercase text-white text-4xl font-bold ">Contact Us</h3>
                <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
                    <p className="">
                        +1 555 663 8892
                    </p>
                </div>
            </section>

        </div>
    )
}