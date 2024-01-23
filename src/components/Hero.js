import Image from "next/image"
import { FaRegArrowAltCircleRight } from "react-icons/fa"

export default function Hero() {
    
    return (
        <section className="hero">
            <div className="py-20 px-4">
                <h1 className="text-4xl font-semibold leading-normal">Your day just got a whole lot better</h1>
                <p className="my-4 text-gray-500">Try our award-winning wings, tenders, and sandwiches. Plus fries made to order and 14 different sauces. The possibilities are endless!</p>
                <div className="flex gap-4 text-sm">
                    <button className="bg-primary text-white uppercase font-semibold px-8 py-2 rounded-full flex items-center gap-2">
                        Order now
                        <FaRegArrowAltCircleRight className='text-xl' />
                    </button>
                    <button className="px-8 py-2 rounded-full flex items-center gap-2 text-gray-500 text-base font-semibold">
                        Learn more
                        <FaRegArrowAltCircleRight className='text-xl' />
                    </button>
                </div>
            </div>
            <div className="relative">
                <Image src='/burrito.png' layout='fill' className="object-contain" alt='Burrito' />
            </div>
        </section>
    )
}