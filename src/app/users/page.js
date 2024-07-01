'use client'
import AdminTabs from "@/components/AdminTabs"
import { useEffect, useState } from "react"
import { useProfileInfo } from "@/hooks/useProfileInfo"
import { toast } from "react-hot-toast"
import Link from "next/link"

export default function UsersPage() {
    const { loading, data } = useProfileInfo()
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users)
            })
        })
    }, [])

    if(!data.admin) {
        return (
            <div className="flex pt-10 justify-center text-xl">Not an admin</div>
        )
    }
    if(loading) {
        return (
            <div className="flex pt-10 justify-center text-xl">Info loading...</div>
        )
    }

    return (
        <section className="py-16 flex flex-col items-center">
            <AdminTabs isAdmin={data.admin} />
            <div className="mt-8">
                { users?.length > 0 && users.map(user => (
                    <div key={users._id} className="flex bg-gray-300 rounded-lg mb-2 p-4 text-black gap-3 items-center">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                            <div className="text-gray-700">
                                { user.name && (<span>{user.name}</span>) }
                                { !user.name && (<span className="italic">No name</span>)}
                            </div>
                            <span>{user.email}</span>
                            <div>
                                <Link href={ '/users/'+user._id }
                                 className="px-12 py-2 mt-2 rounded-lg bg-primary text-white text-lg font-semibold"
                                 >
                                    Edit
                                </Link>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}