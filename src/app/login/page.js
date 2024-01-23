'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Image from "next/image"
import Link from 'next/link'

export default function LoginPage() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loginInProgress, setLoginInProgress ] = useState(false)
    
    async function handleFormSubmit (e) {
        e.preventDefault()
        setLoginInProgress(true)
        
        await signIn('credentials', {email, password, callbackUrl: '/'}) // Callback URL for redirect on login
        
        setLoginInProgress(false)
    }
    return (
        <section className='py-24'>
            <h1 className='text-center text-primary text-4xl mb-4'>Login</h1>
            <form className="flex flex-col items-center justify-center" onSubmit={handleFormSubmit}>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" 
                    className="w-1/2 my-4 rounded-xl border p-2 border-primary text-black disabled:bg-slate-500" disabled={loginInProgress}
                />
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                    className="w-1/2 my-4 rounded-xl border p-2 border-primary text-black disabled:bg-slate-500" disabled={loginInProgress}
                />
                <button className="w-1/2 font-semibold px-6 py-2 rounded-xl border border-primary disabled:cursor-not-allowed disabled:bg-red-400" 
                    type="submit" disabled={loginInProgress}
                >
                    Login
                </button>

                <div className="my-4 text-center text-gray-500">or login with provider</div>
                <button onClick={() => signIn('google', {callbackUrl: '/'})}
                    className="flex gap-4 justify-center items-center w-1/2 text-black font-semibold px-6 py-3 rounded-xl bg-gray-300 border border-primary"
                >
                    <Image src='/logo-google.png' width={24} height={24} alt='google-logo' className='object-contain' />
                    Login with Google
                </button>

                <div className="text-center my-4 text-white border-t pt-4">
                    Don't have an account? <Link className="underline text-blue-300" href={'/register'}>Register here</Link>
                </div>
            </form>
        </section>
    )
}