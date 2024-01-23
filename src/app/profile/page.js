'use client'
import Image from "next/image"
import { useSession } from 'next-auth/react'
import burritoImg from '../../../public/burrito.png'
import { useState, useEffect } from 'react'

export default function ProfilePage() {
    const session = useSession()
    const status = session?.status
    const userData = session.data?.user
    console.log(session)
    const [ userName, setUserName ] = useState('')

    useEffect(() => {
        if ( status === 'authenticated' ){
            setUserName(session.data.user.name)
        }
    }, [ session, status ])
    /*
    if (status === 'loading') {
        return 'Loading...'
    }
    if (status === 'unauthenticated') {
        return redirect('/login')
    }
    */

    const userImage = session.data?.user?.image || burritoImg

    async function handleUpdateProfileInfo (e) {
        e.preventDefault()
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': "application/json" },
            body: JSON.stringify({ name: userName })
        })
        
        if(response.ok) {
            resolve()
        } else {
            reject()
        }
    }



    return (
        <section className="py-24">
            <h1 className='text-center text-primary text-4xl mb-4'>Profile</h1>
            <div className="max-w-md mx-auto">
                <div className="flex gap-4 items-center">
                    <div className="">
                        <div className="flex flex-col rounded-lg p-4 gap-4 justify-center">
                            <Image src={userImage} className="w-10 h-10" className="rounded-lg" alt="UserProfile"/>
                            <button type="button" className="p-2 mt-4 rounded-lg bg-primary">Change Avatar</button>
                        </div>
                    </div>
                    <form className="flex w-full flex-col justify-center items-center" onSubmit={ () => handleUpdateProfileInfo() }>
                        <input type="text" value={userName} onChange={(e)=> setUserName(e.target.value)} placeholder="First and last name" className="p-1 rounded-lg text-black" />
                        <input type="text" disabled={true} value={session?.data?.user?.email} className="p-1 rounded-lg disabled:cursor-not-allowed" />
                        <button type="submit" className="p-2 rounded-lg bg-primary">Save</button>
                    </form>
                </div>

            </div>
        </section>
    )
}