'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function RegisterPage () {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ userCreated, setUserCreated ] = useState(false)
    const [ creatingUser, setCreatingUser ] = useState(false)
    const [ error, setError ] = useState("")

    async function handleFormSubmit(e) {
        e.preventDefault()
        setError(false)
        setUserCreated(false)
        setCreatingUser(true)

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok) {
            setUserCreated(true)
        } else {
            setError(true)
        }
        setCreatingUser(false)

    }

    return (
        <section className="pt-40 md:pt-52 min-h-[100vh]">
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
            
            { userCreated && (
                <div className="my-4 text-center text-white">
                    User created.<br />
                    You can now <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}

            { error && (
                <div className="my-4 text-center text-white">
                    There was an error. Please try again.
                </div>
            )}

            <form className="flex flex-col items-center justify-center" onSubmit={handleFormSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" 
                    className="w-4/5 md:w-1/3 my-4 rounded-xl border p-2 border-primary text-black disabled:bg-slate-500" disabled={creatingUser}
                />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                    className="w-4/5 md:w-1/3 my-4 rounded-xl border p-2 border-primary text-black disabled:bg-slate-500" disabled={creatingUser}
                />
                <button className="w-4/5 md:w-1/3 font-semibold px-6 py-2 rounded-xl border border-primary hover:bg-primary disabled:cursor-not-allowed disabled:bg-red-400 text-gray-800 hover:text-white" 
                    type="submit" disabled={creatingUser}
                >
                    Register
                </button>
                <div className="my-4 text-center text-gray-800">or login with provider</div>
                <button onClick={() => signIn('google', {callbackUrl: '/'})}
                    className="flex gap-4 justify-center items-center w-4/5 md:w-1/3 text-black font-semibold px-6 py-3 rounded-xl bg-gray-300 border border-primary"
                >
                    <Image src='/google-logo.png' width={24} height={24} alt='google-logo' className='object-contain' />
                    Login with Google
                </button>

                <div className="text-center my-6 text-gray-800">
                    Already have an account? <Link className="underline text-blue-700" href={'/login'}>Login here</Link>
                </div>
            </form>
        </section>
    )
}