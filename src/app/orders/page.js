'use client'
import AdminTabs from "@/components/AdminTabs"
import { useProfileInfo } from "@/hooks/useProfileInfo"
import { useState, useEffect } from "react"
import { databaseTimeForHuman } from "@/libs/datetime"
import Link from "next/link"

export default function OrdersPage() {
    const [ isAdmin, setIsAdmin ] = useState('')
    const [ orders, setOrders ] = useState([])
    const [ ordersLoading, setOrdersLoading ] = useState(true)
    const { loading, data: profileData } = useProfileInfo()

    useEffect(() => {
        fetchOrders()
    }, [])

    function fetchOrders() {
        fetch('/api/orders').then(res => {
            setOrdersLoading(true)
            res.json().then(orders => {
                setOrders(orders.reverse()) // Reverse order, most recent first
                setOrdersLoading(false)
            })
        })
    }


    return (
        <section className="py-16 flex flex-col items-center">
            <AdminTabs isAdmin={profileData.admin}/>
            <div className="mt-8 max-w-3xl">
                { ordersLoading && (
                    <div>Loading orders...</div>
                )}

                {orders?.length > 0 && orders.map( order => (
                    <div key={order._id} className="bg-gray-800 mb-2 p-4 rounded-lg grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="text-center font-bold text-2xl">
                                <span className={(order.paid ? 'text-green-700' : 'text-red-700')}>
                                    {order.paid ? 'Paid' : 'Not paid'}
                                </span>
                            </div>
                            <span className="font-bold text-lg">{order.userEmail}</span>
                            <div className="text-sm">
                                {order?.cartProducts?.map(product => product.name).join(', ')}
                            </div>
                        </div>
                        <div className="text-center flex flex-col gap-2">
                            <span className="text-sm text-gray-300">{databaseTimeForHuman(order.createdAt)}</span>
                            <Link className='text-white rounded-lg px-2 py-2 border-2 border-white hover:bg-primary'
                                href={"/orders/"+order._id}>
                                Show order
                            </Link>
                        </div>
                    </div>
                ))}   
            </div>
            
        </section>
    )
}