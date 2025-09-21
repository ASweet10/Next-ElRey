import { FaRegArrowAltCircleRight } from "react-icons/fa"

export default function AddToCartButton({hasSizesOrExtras, basePrice, image, onClick }) {
    if (!hasSizesOrExtras) {
        return (
            <button onClick={onClick}
                className="bg-yellow-700 hover:bg-yellow-600 text-white rounded-lg flex p-2"
            >
                Add to cart ${basePrice}
            </button>
        )
    }
    
    return (
        <button className="flex p-3 items-center gap-2 bg-yellow-700 hover:bg-yellow-600 rounded-lg text-white" type="button"
            onClick={onClick}
            >
                <span>Add to cart (from ${basePrice})</span>
            <FaRegArrowAltCircleRight className='text-white'/>
        </button>
    )
}