'use client'
import AdminTabs from "@/components/AdminTabs"
import EditableImage from "@/components/EditableImage"
import { useProfileInfo } from "@/hooks/useProfileInfo"
import { toast } from "react-hot-toast"
import { useState, useEffect } from "react"
import Link from "next/link"
import { redirect, useParams } from 'next/navigation'
import MenuItemForm from "@/components/MenuItemForm"

export default function EditMenuItemPage() {
    
    const { id } = useParams()
    const [ menuItem, setMenuItem ] = useState(null)
    const { loading, data } = useProfileInfo()

    const [ redirectToItems, setRedirectToItems ] = useState(false)

    useEffect(() => {
        // Fetch all menu items
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                // Check if any fetched items have same id as one being edited
                const item = items.find(i => i._id === id)
                //console.log(item)
                setMenuItem(item)
            })
        })
    }, [])

    async function handleEditMenuItem(e, data) {
        e.preventDefault()
        data = {...data, _id:id} // Spread creates new object; Add id to existing data
        const savePromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
            if(response.ok) {
                resolve()
            } else {
                reject()
            }
        })

        await toast.promise(savePromise, {
            loading: 'Saving your item...',
            success: 'Saved!',
            error: 'Error!',
        })

        setRedirectToItems(true)
    }

    if(redirectToItems) {
        return redirect('/menu-items')
    }

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
        <section className="py-16 flex flex-col justify-center items-center">
            <AdminTabs isAdmin={data.admin} />
            <div className="max-mw-md mx-auto mt-8">
                <Link href={'/menu-items'} 
                    className="px-12 py-3 mt-3 rounded-lg bg-primary text-white text-lg font-semibold"
                >
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={menuItem} onSubmit={handleEditMenuItem}/>
        </section>
    )
}