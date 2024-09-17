import { FaRegArrowAltCircleRight } from "react-icons/fa"
import FlyingButton from 'react-flying-item'

export default function AddToCartButton({hasSizesOrExtras, basePrice, image, onClick }) {
    if (!hasSizesOrExtras) {
        return (
            <button onClick={onClick}
                className="border-primary bg-primary text-white rounded-lg text-lg flex p-2"
            >
                Add to cart ${basePrice}
            </button>
        )
    }
    
    return (
        <button className="flex p-2 items-center gap-2 text-xl bg-primary rounded-lg" type="button"
            onClick={onClick}
            >
                <span>Add to cart (from ${basePrice})</span>
            <FaRegArrowAltCircleRight className='text-white'/>
        </button>
    )
}