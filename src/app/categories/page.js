'use client'
import AdminTabs from "@/components/AdminTabs"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useProfileInfo } from "@/hooks/useProfileInfo"
import { toast } from "react-hot-toast"
import Image from "next/image"

export default function CategoriesPage() {
    const { loading, data } = useProfileInfo()
    const [ categoryName, setCategoryName ] = useState("")
    const [ categories, setCategories ] = useState("")
    const [ editedCategory, setEditedCategory ] = useState(null)

    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(response => {
            response.json().then(categories => {
                setCategories(categories)
            })
        })
    }

    async function handleSubmitCategory(e) {
        e.preventDefault()
        const creationPromise = new Promise(async (resolve, reject) => {
           const data = { name: categoryName } // Data for POST
           if (editedCategory) { // If updating... 
            data._id = editedCategory._id // Add _id to data
           }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST', // If editedCategory exists in state, put; else post
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            setCategoryName('')
            fetchCategories()
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        })
        await toast.promise(creationPromise, {
            loading: editedCategory ? 'Updating...' : 'Creating your new category...',
            success: editedCategory ? 'Category updated!' : 'Category created!',
            error: editedCategory ? 'There was an error updating. Please try again.' : 'There was an error creating your category. Please try again.'
        })
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
        <section className="py-16 flex flex-col items-center">
            <AdminTabs isAdmin={data.admin} />
            <form className="flex flex-col items-start max-w-xl mx-auto gap-2" onSubmit={handleSubmitCategory}>
                <div className="flex gap-2 items-end">
                    <div className="flex flex-col gap-1">
                        <label className="text-xl">
                            { editedCategory ? 'Update: ' : 'New category' }
                            { editedCategory && (
                                <> <b>{ editedCategory.name }</b> </>
                            )}
                        </label>
                        <input type="text" className="py-2 px-4 rounded-lg text-black" 
                            value={ categoryName }
                            onChange={ e => setCategoryName(e.target.value) }
                        />
                    </div>
                    <div>
                        <button type="submit" className="px-12 py-2 rounded-lg bg-primary text-white text-lg font-semibold">
                            { editedCategory ? 'Update' : 'Create' }
                        </button>
                    </div>
                </div>

            </form>
            <h1 className="mt-4 text-2xl font-bold">Edit Category</h1>
            <div className="grid grid-cols-3 w-1/2 flex-col my-4 gap-2">
                { categories?.length > 0 && categories.map(cat => (
                    <div className="flex flex-col bg-gray-300 rounded-lg p-4 px-4 text-black gap-4 items-center justify-center">
                        <button
                            onClick={() => {
                                setEditedCategory(cat)
                                setCategoryName(cat.name)
                            }}
                            className="text-lg font-bold"
                        >
                            {cat.name}
                        </button>
                        <Image src='/burrito.png' width={50} height={50}/>
                    </div>
                ))}
            </div>
        </section>
    )
}