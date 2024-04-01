'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminTabs ({ isAdmin }) {
    const path = usePathname()
    console.log(path)

    return (
        <div className="flex gap-4 font-bold text-xl mb-8">
            <Link 
                className={`rounded-full py-2 px-4 text-white bg-primary" + ${path === '/profile' ? 'bg-primary' : 'bg-gray-800'}`} 
                href={'/profile'}
            >
                Profile
            </Link>
            { isAdmin && (
                <>
                    <Link 
                        className={`rounded-full py-2 px-4 text-white bg-primary" + ${path === '/categories' ? 'bg-primary' : 'bg-gray-800'}`} 
                        href={'/categories'}
                    >
                        Categories
                    </Link>
                    <Link 
                        className={`rounded-full py-2 px-4 text-white bg-primary" + ${path === '/menu-items' ? 'bg-primary' : 'bg-gray-800'}`} 
                        href={'/menu-items'}
                    >
                        Menu Items
                    </Link>
                    <Link 
                        className={`rounded-full py-2 px-4 text-white bg-primary" + ${path === '/users' ? 'bg-primary' : 'bg-gray-800'}`} 
                        href={'/users'}
                    >
                        Users
                    </Link>
                </>
            )}
        </div>
    )
}