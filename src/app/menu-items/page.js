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
            <div className="flex pt-10 justify-center text-xl">Not an admin</div>
        )
    }
    if(loading) {
        return (
            <div className="flex pt-10 justify-center text-xl">Info loading...</div>
        )
    }

    return (
        <div className="py-16 flex flex-col justify-center items-center">
            <AdminTabs isAdmin={data.admin} />
            <div className="mt-8">
                <Link href={'/menu-items/new'}
                    className="px-12 py-3 mt-3 rounded-lg bg-primary text-white text-lg font-semibold"
                >
                    Create new menu item
                </Link>
            </div>
            <div className="mt-8">
                <h2>Edit menu item:</h2>
                { menuItems?.length > 0 && menuItems.map(item => (
                    <Link key={item._id} href={'/menu-items/edit/'+ item._id} className="flex bg-gray-300 rounded-lg p-4 text-black gap-4 items-center justify-center my-2">
                        <div className="relative">
                            <Image src={item.image} alt={''} width={150} height={150}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-lg font-bold">{item.name}</div>
                            <div className="font-semibold">{item.description}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}