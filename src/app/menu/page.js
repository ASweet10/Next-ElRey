'use client'
import { useEffect, useState } from "react"
import MenuItem from "@/components/MenuItem"

export default function MenuPage() {
    const [ categories, setCategories ] = useState([])
    const [ menuItems, setMenuItems ] = useState([])

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories))
        })
        fetch('/api/menu-items').then(res => {
            res.json().then(items => setMenuItems(items))
        })
        
    }, [])
    
    return (
        <section className="py-40 flex flex-col gap-16">
            {categories?.length > 0 && categories.sort((a, b) => a.index - b.index).map(cat => (
                <div key={cat.index} className="flex flex-col items-center text-center justify-center md:px-24">
                    <div className="text-center text-gray-900">
                        <h1 className="text-6xl font-bold">{cat.name}</h1>
                    </div>
                    <div className="grid md:grid-cols-2 my-8 gap-6">
                        { menuItems?.filter(item => item.category === cat._id).map(item => (
                            <MenuItem {...item} key={item._id} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}