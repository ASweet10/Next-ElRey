'use client'
import { useEffect, useState } from "react"
import MenuItem from "@/components/MenuItem"

export default function MenuPage() {
    const [ categories, setCategories ] = useState([])
    const [ menuItems, setMenuItems ] = useState([])

    useEffect(() => {
        // We use Promise.all to make sure both fetches finish before we try to scroll
        Promise.all([
            fetch('/api/categories').then(res => res.json()),
            fetch('/api/menu-items').then(res => res.json())
        ]).then(([categoriesData, itemsData]) => {
            setCategories(categoriesData)
            setMenuItems(itemsData)

            // 1. Wait a tiny beat for the DOM to actually render the new state
            setTimeout(() => {
                const hash = window.location.hash
                if (hash) {
                    const id = hash.replace('#', '')
                    const element = document.getElementById(id)
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                    }
                }
            }, 500) // 100ms is usually plenty for React to paint the DOM
        })
    }, [])
    
    return (
        <section className="py-40 flex flex-col gap-16">
            {categories?.length > 0 && categories.sort((a, b) => a.index - b.index).map((cat) => {
                 // Specials button navigation: Slugify "Margaritas & Cocktails" => "margaritas-cocktails"
                const slug = cat.name
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '') // Remove everything except letters, numbers, and spaces
                .trim()                       // Remove leading/trailing whitespace
                .replace(/\s+/g, '-')        // Turn spaces (one or more) into a single dash

                return (
                    <div 
                        key={cat.index} 
                        className="flex flex-col items-center text-center justify-center md:px-24 scroll-mt-28"
                        id={slug}
                    >
                        <div className="text-center text-gray-900">
                            <h1 className="text-6xl font-bold">{cat.name}</h1>
                        </div>
                        <div className="grid md:grid-cols-2 my-8 gap-6">
                            { menuItems?.filter(item => item.category === cat._id).map(item => (
                                <MenuItem {...item} key={item._id} />
                            ))}
                        </div>
                    </div>
                )
            })}
        </section>
    )
}