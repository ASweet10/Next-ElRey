
export default function AddToCartButton({hasSizesOrExtras, basePrice, image, onClick }) {
    if (!hasSizesOrExtras) {
        return (
            <button onClick={onClick}
                className="flex py-3 px-10 items-center gap-2 bg-gray-950 hover:bg-gray-800 rounded-lg 
                text-yellow-600  text-xl uppercase font-bold
                transition-transform duration-1000" 
            >
                Add to cart - ${basePrice}
            </button>
        )
    }
    
    return (
        <button 
            className="flex py-3 px-10 items-center gap-2 bg-gray-950 hover:bg-gray-800 rounded-lg text-white transition-transform duration-1000" 
            type="button"
            onClick={onClick}
            >
                <span className="text-yellow-600 text-xl uppercase font-bold">Order</span>
        </button>
    )
}