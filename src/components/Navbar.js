'use client'
import Link from 'next/link'
import { RxHamburgerMenu } from "react-icons/rx"
import { LuCrown } from "react-icons/lu"
import { FaCartShopping } from "react-icons/fa6"
import { useSession, signOut } from 'next-auth/react'
import { CartContext } from './AppContext'
import { useContext, useState, useEffect } from 'react'

export default function Header() {
  const session = useSession() // Current login session; Logout to refresh
  const status = session?.status
  const [ navOpen, setNavOpen ] = useState(false)

  const [ scrolled, setScrolled ] = useState(false)

  const userData = session?.data?.user
  let userName = userData?.name || userData?.email
  if( userName && userName.includes(' ')) {
    userName = userName.split(' ')[0] // Split name around space if present; use first element
  }
  const { cartProducts } = useContext(CartContext)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    {/* <header className='fixed transform transition-all duration-200 pt-6 h-24 w-full z-50 text-white'> */}
    
    return (
        <header 
          className={`
            fixed top-0 w-full h-40 z-50 transition-all duration-300 text-white
            ${scrolled ? "bg-gray-950 shadow-md translate-y-0 pt-6" : "pt-28 bg-transparent -translate-y-20"}
          `}
        >

        {/* Mobile */}
          <div className='flex gap-20 md:hidden px-6'>
            <Link className='text-white flex gap-2 text-xl md:text-3xl font-semibold items-center' href={'/'}>
              <LuCrown className='text-white text-3xl'/>
              El Rey
            </Link>

            <div className='flex gap-10 items-center'>
              <Link href={'/cart'} className='relative'>
                <FaCartShopping className='text-2xl'/>
                { cartProducts?.length > 0 && (
                  <span className='absolute -top-3.5 -right-3.5 bg-yellow-700 text-white py-0.5 px-2 rounded-full '>{cartProducts?.length}</span>
                )}
              </Link>
              <button onClick={() => setNavOpen(navOpen => !navOpen)} className='p-2'>
                <RxHamburgerMenu className='text-2xl' />
              </button>
            </div>
          </div>
          
          {/* Mobile Popup */}
          {navOpen && (
            <div onClick={() => setNavOpen(false)}
              className='flex flex-col absolute w-full md:hidden p-3 rounded-lg mt-2 gap-4 text-center text-yellow-700 text-xl font-semibold'
            >
              <Link href={'/menu'}>Menu</Link>
              <Link href={'/about'}>About</Link>
              <Link href={'/#contact'}>Contact</Link>

              { status === 'authenticated' && (
                <>
                  <Link href={'/profile'}>Hello {userName}</Link>
                  <button onClick={() => signOut()} 
                    className='bg-yellow-700 hover:bg-yellow-600 text-white rounded-full px-6 py-2'
                  >
                    Logout
                  </button>
                </>
              )}
              {/* May need to be 'unauthenticated' */}
              { status !== 'authenticated' && (
                <>
                  <Link href={'/login'} className='text-white rounded-full px-6'>
                    Login
                  </Link>
                  <Link href={'/register'} className='text-white rounded-full px-6 pb-4'>
                    Register
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Desktop */}
          <div className='hidden md:flex flex-col items-center justify-center gap-3'>

            <Link className='text-white flex gap-2 text-4xl font-semibold items-center hover:text-yellow-600' href={'/'}>
              <LuCrown className='text-white text-5xl'/>
              <h1>El Rey</h1>
            </Link>

            <hr className='border w-3/4 border-white' />

            <nav className='flex gap-4 font-semibold items-center'>
              <div className='flex gap-8 text-xl'>
                <Link className='hover:text-yellow-600' href={'/menu'}>Menu</Link>
                <Link className='hover:text-yellow-600' href={'/about'}>About</Link>
                <Link className='hover:text-yellow-600' href={'/#contact'}>Contact</Link>

                <Link href={'/cart'} className='relative flex items-center gap-1 hover:text-yellow-600'>
                  <h1 className='font-bold text-xl'>Order</h1>
                  <FaCartShopping className='text-2xl'/>
                  { cartProducts?.length > 0 && (
                    <span className='absolute -top-3.5 -right-3.5 bg-yellow-600 text-white py-[1px] px-2 rounded-full'>{cartProducts?.length}</span>
                  )}
                </Link>

                <div className='flex items-center text-xl'>
                  { status === 'authenticated' && (
                    <>
                    <Link href={'/profile'}>Hello {userName}</Link>
                    <button 
                      onClick={() => signOut()} 
                      className='bg-yellow-700 hover:bg-yellow-600 text-white rounded-full py-2'
                    >
                      Logout
                    </button>
                    </>
                  )}
                  {/* May need to be 'unauthenticated' */}
                  { status !== 'authenticated' && (
                    <Link href={'/login'} className='text-white rounded-full font-semibold hover:text-yellow-600'>
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </nav>






          </div>
      </header>
)}