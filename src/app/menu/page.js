'use client'
import { useEffect, useState } from "react"
import MenuItem from "@/components/MenuItem"
import { PuffLoader } from "react-spinners"

export default function MenuPage() {
    const [ categories, setCategories ] = useState([])
    const [ menuItems, setMenuItems ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories))
        })
        fetch('/api/menu-items').then(res => {
            res.json().then(items => setMenuItems(items))
        }).then(
            setIsLoading(false)
        )

    }, [])
    
    return (
        <section className={`app__graniteBg ${!isLoading && 'py-36'} flex flex-col gap-32 text-white`}>
            { isLoading ? <div className="h-full w-full app__graniteBg">
                <PuffLoader />
            </div>
                :
                <div>
                    {categories?.length > 0 && categories.sort((a, b) => a.index - b.index).map(cat => (
                        <div key={cat.index} className="flex flex-col items-center text-center justify-center md:px-24">
                            <div className="text-center">
                                <h1 className="text-6xl font-bold">{cat.name}</h1>
                            </div>
                            <div className="grid md:grid-cols-4 my-8">
                                { menuItems?.filter(item => item.category === cat._id).map(item => (
                                    <MenuItem {...item} key={item._id} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            }

        </section>
    )
}