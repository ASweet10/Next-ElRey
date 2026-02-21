'use client'
import { useEffect, useState } from "react"
import VideoHero from "./VideoHero"
import BannerHero from "./BannerHero"
import GalleryHero from "./GalleryHero"
import HomeMenu from "./HomeMenu"
import Contact from "./Contact"

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
        <div>
            <VideoHero />
            <BannerHero />
            <GalleryHero />
            <HomeMenu items={bestSellers}/>
            <Contact />
        </div>
    )
}