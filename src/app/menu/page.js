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
        <section className="mt-8">
            {categories?.length > 0 && categories.map(cat => (
                <div key={cat._id} className="flex flex-col items-center text-center justify-center my-8">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">{cat.name}</h1>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 my-8">
                        { menuItems?.filter(item => item.category === cat._id).map(item => (
                            <MenuItem {...item} key={item._id} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}