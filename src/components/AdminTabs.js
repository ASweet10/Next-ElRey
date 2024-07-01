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
                    <Link href={'/categories'}
                        className={`rounded-full py-2 px-4 text-white bg-primary" + ${path === '/categories' ? 'bg-primary' : 'bg-gray-800'}`}
                    >
                        Categories
                    </Link>
                    <Link href={'/menu-items'}
                        // Using path.includes to check if menu-items present anywhere in url (for menu-items/new as well)
                        className={`rounded-full py-2 px-4 text-white bg-primary" + ${path.includes('menu-item') ? 'bg-primary' : 'bg-gray-800'}`}
                    >
                        Menu Items
                    </Link>
                    <Link 
                        className={`rounded-full py-2 px-4 text-white bg-primary" + ${path.includes('/users') ? 'bg-primary' : 'bg-gray-800'}`} 
                        href={'/users'}
                    >
                        Users
                    </Link>
                    <Link 
                        className={`rounded-full py-2 px-4 text-white bg-primary" + ${path === '/orders' ? 'bg-primary' : 'bg-gray-800'}`} 
                        href={'/orders'}
                    >
                        Orders
                    </Link>
                </>
            )}
        </div>
    )
}