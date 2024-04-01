'use client'
import AdminTabs from "@/components/AdminTabs"
import EditableImage from "@/components/EditableImage"
import { useProfileInfo } from "@/hooks/useProfileInfo"
import { useState } from "react"

export default function MenuItemsPage() {

    const { loading, data } = useProfileInfo()
    const [ image, setImage ] = useState('')
    const [ itemName, setItemName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ editedItem, setEditedItem ] = useState('')

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

    async function handleSubmitMenuItem(e) {
        e.preventDefault()

    }

    return (
        <section className="py-16 flex flex-col justify-center items-center">
            <AdminTabs isAdmin={data.admin} />
            <form className="flex flex-col items-start max-w-xl mx-auto gap-2" onSubmit={handleSubmitMenuItem}>
                <div className="flex gap-4">
                    <div className="max-w-[200px]">
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg">Item name</label>
                        <input type="text" className="py-2 px-4 rounded-lg text-black" />
                        <label className="text-lg">Description</label>
                        <input type="text" className="py-2 px-4 rounded-lg text-black" />
                        <label className="text-lg">Base price</label>
                        <input type="text" className="py-2 px-4 rounded-lg text-black" />                    
                        <button type="submit" className="px-12 py-3 mt-3 rounded-lg bg-primary text-white text-lg font-semibold">Save</button>
                    </div>
                </div>

            </form>
        </section>
    )
}