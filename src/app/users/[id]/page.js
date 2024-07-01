'use client'
import AdminTabs from "@/components/AdminTabs"
import { useEffect, useState } from "react"
import { useProfileInfo } from "@/hooks/useProfileInfo"
import UserForm from "@/components/UserForm"
import { useParams } from "next/navigation"
import { toast } from 'react-hot-toast'

export default function EditUserPage () {
    const { loading, data } = useProfileInfo()
    const { id } = useParams()
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        fetch('/api/profile?_id='+id).then(res => {
            res.json().then(user => {
                setUser(user)
            })
        })
    }, [])

    async function handleSaveUserProfile(e, data) {
        e.preventDefault()
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ ...data, _id:id })
            })
            if (res.ok) {
                resolve()
            } else {
                reject()
            }
        })

        await toast.promise(promise, {
            loading: 'Saving user...',
            success: 'User saved!',
            error: 'An error has occurred. Please try again.'
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
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveUserProfile} />
            </div>
        </section>
    )
}