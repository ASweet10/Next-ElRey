import { FaRegArrowAltCircleRight } from "react-icons/fa"

export default function MenuItemTile ({onAddToCart, ...item}) {
    const { image, description, name, basePrice } = item

    return (
        <div className="p-4 gap-2 text-center flex flex-col items-center justify-center group mx-4">
            <img src={image} className="max-h-auto max-h-24"/>
            <h3 className="font-semibold my-2 text-2xl">{name}</h3>
            <p className="text-gray-500 text-sm">{description}</p>
            <button className="flex p-2 items-center gap-2 text-xl bg-primary rounded-lg" type="button"
                onClick={onAddToCart}
            >
                Add to cart ${basePrice}
                <FaRegArrowAltCircleRight className='text-white'/>
            </button>
        </div>
    )
}