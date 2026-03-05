import { Poppins, Oswald } from 'next/font/google'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { AppProvider } from '@/components/AppContext'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] })
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'El Rey',
  description: 'Authentic mexican cuisine and hand-crafted margaritas',
icons: {
    icon: [
      {
        url: '/icon.png',
        href: '/icon.png',
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='scroll-smooth app__bgImage'>
      <body className={poppins.className + " + " + oswald.className}>
        <main className='mx-auto'>
          <AppProvider>
            <Toaster />
            <Navbar />
            {children}
          </AppProvider>
        </main>
      </body>
    </html>
  )
}