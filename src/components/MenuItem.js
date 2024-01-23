import { FaRegArrowAltCircleRight } from "react-icons/fa"

export default function MenuItem () {
    return (
        <div className="p-4 text-center flex flex-col items-center justify-center group">
            <img src="/nachos.png" className="hover:scale-110 transform duration-300"/>
            <h3 className="font-semibold my-2 text-2xl">Nachos</h3>
            <p className="text-gray-500 text-sm">
                A delicious plate of nachos. who doesn't love nachos? Cheese and chips and what not
            </p>
            <button className="flex items-center gap-2 pt-6 invisible group-hover:visible text-xl">
                Order
                <FaRegArrowAltCircleRight className='text-primary'/>
            </button>
        </div>
    )
}