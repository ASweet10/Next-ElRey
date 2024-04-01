'use client'
import Image from "next/image"
import { useSession } from 'next-auth/react'
import burritoImg from '../../../public/burrito.png'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import AdminTabs from "@/components/AdminTabs"
import EditableImage from "@/components/EditableImage"

export default function ProfilePage() {
    const session = useSession()
    const { status } = session
    const email = session?.data?.user?.email || ''
    const [ userName, setUserName ] = useState('')
    const [ saved, setSaved ] = useState(false)
    const [ saving, setIsSaving ] = useState(false)
    const [ image, setImage ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ streetAddress, setStreetAddress ] = useState('')
    const [ city, setCity ] = useState('')
    const [ zipCode, setZipCode ] = useState('')
    const [ usState, setUSState ] = useState('')
    const [ isAdmin, setIsAdmin ] = useState('')
    const [ profileFetched, setProfileFetched ] = useState(false)

    useEffect(() => {
        if ( status === 'authenticated' ){
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    console.log(data)
                    setUserName(data.name)
                    setImage(data.image)
                    setPhone(data.phone)
                    setStreetAddress(data.streetAddress)
                    setCity(data.city)
                    setZipCode(data.zipCode)
                    setUSState(data.usState)
                    setIsAdmin(data.admin)
                    setProfileFetched(true)
                })
            })
        }
    }, [ session, status ])

    async function handleUpdateProfileInfo (e) {
        e.preventDefault()
        const savePromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': "application/json" },
                body: JSON.stringify({ 
                    name: userName,
                    image,
                    phone,
                    streetAddress,
                    city,
                    zipCode,
                    usState,
                })
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
                <div className="flex gap-4 items-center">
                    <div className="flex">
                        <div className="flex flex-col rounded-lg p-4 gap-3 justify-center">
                            <EditableImage link={image} setLink={setImage} />
                        </div>
                    </div>

                    <form className="flex flex-col gap-2 text-black" onSubmit={ handleUpdateProfileInfo }>
                        <label className="text-white">Name</label>
                        <input type="text" value={userName} onChange={(e)=> setUserName(e.target.value)} 
                            placeholder="First and last name" className="p-2 rounded-lg" 
                        />
                        <label className="text-white">Email</label>
                        <input type="email" value={session?.data?.user?.email} disabled={true} className="p-2 rounded-lg text-white" />
                        <label className="text-white">Phone Number</label>
                        <input type="tel" placeholder="Phone Number" className="p-2 rounded-lg" 
                            value={phone} onChange={(e) => setPhone(e.target.value)}    
                        />
                        <label className="text-white">Street Address</label>
                        <input type="text" placeholder="Street Address" className="p-2 rounded-lg" 
                            value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} 
                        />
                        <label className="text-white">City</label>
                        <input type="text" placeholder="City" className="p-2 rounded-lg" 
                            value={city} onChange={(e) => setCity(e.target.value)} 
                        />
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-2">
                                <label className="text-white">Zip Code</label>
                                <input type="text" placeholder="Zip Code" className="p-2 rounded-lg" 
                                    value={zipCode} onChange={(e) => setZipCode(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white">State</label>
                                <input type="text" placeholder="State" className="p-2 rounded-lg" 
                                    value={usState} onChange={(e) => setUSState(e.target.value)} 
                                />
                            </div>
                        </div>
                        <button type="submit" className="px-12 py-3 mt-4 rounded-lg bg-primary text-white text-lg font-semibold">Save Changes</button>
                    </form>
                </div>

            </div>
        </section>
    )
}