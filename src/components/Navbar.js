'use client'
import Image from 'next/image'
import Link from 'next/link'
import { GiChicken } from "react-icons/gi"
import { LuCrown } from "react-icons/lu"
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

export default function Header() {
  const session = useSession()
  console.log(session)
  const status = session?.status

  const userData = session?.data?.user
  let userName = userData?.name || userData?.email
  if( userName && userName.includes(' ')) {
    userName = userName.split(' ')[0] // Split name around space if present & use first element
  }

    return (
        <header className='flex justify-between items-center px-2 md:px-8'>
        <Link className='text-white flex gap-2 text-3xl font-semibold items-center' href={'/'}>
          <LuCrown className='text-white text-4xl'/>
          Los Tacos Del Rey
        </Link>
        <nav className='flex gap-4 font-semibold items-center'>
          <div className='flex gap-4 items-center'>
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/about'}>About</Link>
            <Link href={'/contact'}>Contact</Link>
          </div>
          <div className='flex gap-2 items-center'>

            { status === 'authenticated' && (
              <>
              <Link href={'/profile'}>Hello {userName}</Link>
              <button 
                onClick={() => signOut()} 
                className='bg-primary text-white rounded-full px-6 py-2'
              >
                Logout
              </button>
              </>
            )}
            {/* May need to be 'unauthenticated' */}
            { status !== 'authenticated' && (
              <>
                <Link href={'/login'} className='text-white rounded-full px-6 py-2'>
                  Login
                </Link>
                <Link href={'/register'} className='bg-primary text-white rounded-full px-6 py-2'>
                  Register
                </Link>
              </>
            )}

          </div>
        </nav>
      </header>
    )
}