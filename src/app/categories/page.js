'use client'
import AdminTabs from "@/components/AdminTabs"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useProfileInfo } from "@/hooks/useProfileInfo"
import { toast } from "react-hot-toast"
import Image from "next/image"
import DeleteButton from "@/components/DeleteButton"

export default function CategoriesPage() {
    const { loading, data } = useProfileInfo()
    const [ categoryName, setCategoryName ] = useState("")
    const [ categoryIndex, setCategoryIndex ] = useState()
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
           const data = { name: categoryName, index: categoryIndex } // Data for POST
           if (editedCategory) { // If updating... 
            data._id = editedCategory._id // Add _id to data
           }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST', // If editedCategory exists in state, put; else post
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            setCategoryName('')
            setCategoryIndex()
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

    async function handleDeleteCategory(_id) {
        const deletionPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE',
            })
            if(response.ok) {
                resolve()
            } else {
                reject()
            }
        })

        await toast.promise(deletionPromise, {
            loading: 'Deleting category...',
            success: 'Category deleted!',
            error: 'There was an error. Please try again.'
        })

        fetchCategories()
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
            <form className="flex flex-col items-start max-w-md md:max-w-xl mx-auto gap-2" onSubmit={handleSubmitCategory}>
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex flex-col gap-1">
                        <label className="text-2xl text-center">
                            { editedCategory ? 'Update: ' : 'New category' }
                            { editedCategory && (
                                <> <b>{ editedCategory.name }</b> </>
                            )}
                        </label>
                        <div className="flex items-center gap-3">
                            <label className="w-1/4 text-xl text-white">Name</label>
                            <input type="text" className="w-3/4 py-2 px-4 rounded-lg text-black" 
                                value={ categoryName }
                                onChange={ e => setCategoryName(e.target.value) }
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-1/4 text-xl text-white">Index</label>
                            <input type="text" className="w-3/4 py-2 px-4 rounded-lg text-black" 
                                value={ categoryIndex }
                                onChange={ e => setCategoryIndex(e.target.value) }
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="px-12 py-2 rounded-lg bg-primary text-white text-lg font-semibold">
                            { editedCategory ? 'Update' : 'Create' }
                        </button>
                        <button type="button" className="px-12 py-2 rounded-lg bg-primary text-white text-lg font-semibold"
                            onClick={() => {
                                setEditedCategory(null)
                                setCategoryName('')
                                setCategoryIndex()
                            }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 md:w-1/2 flex-col my-4 gap-2">
                { categories?.length > 0 && categories.map(cat => (
                    <div key={cat._id} className="flex flex-col bg-gray-300 rounded-lg p-4 px-4 text-black gap-4 items-center justify-center">
                        <div className="grow text-2xl font-bold">{cat.name}</div>
                        <h1 className="text-xl font-bold">Index: {cat.index}</h1>
                        <div className="flex gap-1">
                            <button className="p-3 mt-2 rounded-lg bg-primary text-white text-lg font-semibold"
                                onClick={() => {
                                    setEditedCategory(cat)
                                    setCategoryName(cat.name)
                                }}
                            >
                                Edit
                            </button>
                            <DeleteButton label="Delete" onDelete={() => handleDeleteCategory(cat._id)}/>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}