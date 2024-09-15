import Image from "next/image"
import Link from "next/link"
import { FaRegArrowAltCircleRight } from "react-icons/fa"

export default function Hero() {
    
    return (
        <section className="hero md:pt-28">
            <div className="py-12 px-4">
                <h1 className="text-4xl font-semibold leading-normal">Your day just got a whole lot better</h1>
                <p className="my-4 text-gray-500">Try our award-winning burritos, tacos, and homemade salsas. Plus soups and sides made to order and 6 different sauces. The possibilities are endless!</p>
                <div className="flex gap-4 text-sm">
                    <Link href={'/menu'} 
                        className="bg-primary text-white font-semibold px-8 py-2 md:py-4 rounded-full flex items-center gap-2"
                    >
                        Menu
                        <FaRegArrowAltCircleRight className='text-xl' />
                    </Link>
                    <Link href={'/#about'} 
                        className="bg-slate-800 text-white px-4 py-2 md:py-4 rounded-full flex items-center gap-2 font-semibold"
                    >
                        Learn more
                        <FaRegArrowAltCircleRight className='text-xl' />
                    </Link>
                </div>
            </div>
            <div className="relative md:block">
                <Image src='/nachos.jpg' layout='responsive' width={500} height={300} className="object-contain" alt='Burrito' />
            </div>
        </section>
    )
}