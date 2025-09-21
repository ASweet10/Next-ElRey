'use client'
import MenuItem from "./MenuItem"
import Link from "next/link"
import { FaRegArrowAltCircleRight } from "react-icons/fa"

export default function HomeMenu({items}) {

    return(
        <section className="pt-32 md:pt-40">
            <div className="text-center pb-16">
                <h1 className='text-gray-800 text-6xl uppercase font-bold'>Our Best Sellers</h1>
            </div>
            <div className="grid md:grid-cols-4 gap-12 md:gap-0">
                {items?.length > 0 && items.slice(1, 5).map(item => (
                    <div key={item._id}>
                        <MenuItem { ...item } />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-28">
                <Link href={'/menu'} 
                    className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold text-xl px-4 py-3 rounded-md flex items-center gap-2 font-cormorant"
                >
                    Full Menu
                    <FaRegArrowAltCircleRight className='text-xl' />
                </Link>
            </div>
        </section>
    )
}