'use client'
import MenuItem from "./MenuItem"
import Link from "next/link"

export default function HomeMenu({items}) {

    return(
        <section className="pt-32 md:pt-40">
            <h1 className='text-gray-900 text-6xl uppercase font-bold text-center pb-16'>Our Best Sellers</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 mx-8 md:mx-16 gap-6 2xl:mx-60">
                {items?.length > 0 && items.slice(1, 7).map(item => (
                    <div key={item._id}>
                        <MenuItem { ...item } />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-20">
                <Link href={'/menu'} 
                    className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold text-xl px-6 py-3 rounded-md flex items-center gap-2 uppercase"
                >
                    Full Menu
                </Link>
            </div>
        </section>
    )
}