'use client'
import Image from "next/image"
import { useSession } from 'next-auth/react'
import burritoImg from '../../../public/burrito.png'
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
                body: JSON.stringify({data})
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

    if(status === 'loading' || !profileFetched) {
        return 'Loading...'
    }
    if(status === 'unauthenticated') {
        return redirect('/login')
    }

    return (
        <section className="py-16 flex flex-col justify-center items-center">
            <AdminTabs isAdmin={isAdmin} />
            <div className="max-w-xl mx-auto">
                <UserForm user={user} />
            </div>
        </section>
    )
}