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
            <BannerHero 
                title={"Our Menu"}
                subtitle={"Award-winning burritos and homemade salsas"}
                description={"Experience hospitality at El Rey. From our award-winning burritos to our homemade salsas, every dish is crafted with fresh ingredients and a passion for flavor."}
                imageSrc={"/salsa.jpg"}
                buttonText={"View Menu"}
                buttonLink={"/menu"}
                reverse={false}
                animationType = "side"
            />
            <BannerHero 
                reverse={true}
                title="Happy Hour"
                subtitle="Hand-Crafted Margaritas & Spirits"
                description="The perfect sunset companion. Join us for daily drink specials featuring our signature top-shelf margaritas, fresh-pressed lime juice, and a curated selection of artisanal tequilas."
                imageSrc="/margaritas.jpg"
                buttonText="See Specials"
                buttonLink="/menu#margaritas-cocktails" // Move to specific part of menu page
                animationType="bottom"
            />
            <GalleryHero />
            <HomeMenu items={bestSellers}/>
            <Contact />
        </div>
    )
}