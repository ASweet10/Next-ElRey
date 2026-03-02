'use client'
import Image from "next/image"
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import AdminTabs from "@/components/AdminTabs"
import EditableImage from "@/components/EditableImage"
import UserForm from "@/components/UserForm"

export default function ProfilePage() {
    const session = useSession()
    const { status } = session
    const [ user, setUser ] = useState(null)
    const [ isAdmin, setIsAdmin ] = useState('')
    const [ profileFetched, setProfileFetched ] = useState(false)

    useEffect(() => {
        if ( status === 'authenticated' ){
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data)
                    setIsAdmin(data?.admin)
                    setProfileFetched(true)
                })
            })
        }
    }, [ session, status ])

    async function handleUpdateProfileInfo (e, data) {
        e.preventDefault()
        const savePromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': "application/json" },
                body: JSON.stringify(data)
            })
            if (response.ok)
                resolve()
            else
                reject()
        })
        
        toast.promise(savePromise, {
            loading: "Saving...",
            success: "Profile saved!",
            error: "Error"
        })
    }

    if(status === 'unauthenticated') {
        return redirect('/login')
    }
    if(status === 'loading' || !profileFetched) {
        return (
            <section className="min-h-screen justify-center flex flex-col items-center py-10 bg-black/60 text-white">
                <div className="text-xl">Info loading...</div>
            </section>
        )
    }

    return (
        <section className="flex flex-col justify-center items-center min-h-screen py-10 bg-black/60">
            <AdminTabs isAdmin={isAdmin} />
            <div className="max-w-xl mx-auto">
                <UserForm user={user} onSave={handleUpdateProfileInfo} />
            </div>
        </section>
    )
}