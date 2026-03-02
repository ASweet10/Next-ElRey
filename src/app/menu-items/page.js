'use client'
import AdminTabs from "@/components/AdminTabs"
import EditableImage from "@/components/EditableImage"
import { useProfileInfo } from "@/hooks/useProfileInfo"
import { toast } from "react-hot-toast"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function MenuItemsPage() {

    const [ menuItems, setMenuItems ] = useState([])
    const { loading, data } = useProfileInfo()

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    }, [])

    if(!data.admin) {
        return (
            <section className="min-h-screen justify-center flex flex-col items-center py-10 bg-black/60 text-white">
                <div className="text-xl">Not an admin</div>
            </section>
        )
    }
    if(loading) {
        return (
            <section className="min-h-screen justify-center flex flex-col items-center py-10 bg-black/60 text-white">
                <div className="text-xl">Info loading...</div>
            </section>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-10 bg-black/60">
            <AdminTabs isAdmin={data.admin} />
            <div className="mt-8">
                <Link href={'/menu-items/new'}
                    className="px-12 py-3 mt-3 rounded-lg bg-primary text-white text-lg font-semibold"
                >
                    Create new item
                </Link>
            </div>
            <div className="mt-8">
                <h2 className="text-white text-xl">Edit menu item:</h2>
                { menuItems?.length > 0 && menuItems.map(item => (
                    <Link key={item._id} href={'/menu-items/edit/'+ item._id} className="flex bg-gray-300 rounded-lg p-4 text-black gap-4 items-center justify-center my-2">
                        <div className="relative w-1/5">
                            <Image src={item.image} alt={''} width={150} height={150}/>
                        </div>
                        <div className="flex flex-col w-4/5">
                            <div className="text-lg font-bold">{item.name}</div>
                            <div className="font-semibold">{item.description}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}