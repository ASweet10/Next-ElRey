import { CartContext } from "./AppContext"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import MenuItemTile from "./MenuItemTile"
import Image from "next/image"

export default function MenuItem (menuItem) {
    const { image, name, description, basePrice, sizes, extraIngredientPrices } = menuItem
    const {addToCart} = useContext(CartContext)
    const [ showPopup, setShowPopup ] = useState(false)
    const [ selectedSize, setSelectedSize ] = useState(sizes?.[0] || null)
    const [ selectedExtras, setSelectedExtras ] = useState([])

    async function handleAddToCartButtonClick() {
        const hasOptions = sizes?.length > 0 || extraIngredientPrices?.length > 0
        if( hasOptions && !showPopup) {
            setShowPopup(true) // Open popup to make changes
            return
        }
        addToCart(menuItem, selectedSize, selectedExtras)
        toast.success('Item added')
        await new Promise(resolve => setTimeout(resolve, 600))
        setShowPopup(false)
    }

    function handleExtraIngredientClick(e, extraItem) {
        const checked = e.target.checked // Checked value (Console log -> event -> target -> checked: true)
        if (checked) {
            setSelectedExtras( prev => [...prev, extraItem] ) // Add new item to existing array using spread
        } else {
            setSelectedExtras( prev => {
                return prev.filter(e => e.name !== extraItem.name) // Use filter to remove selected item
            })
        }
    }

    let selectedPrice = basePrice
    if (selectedSize) {
        selectedPrice += selectedSize.price
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price
        }
    }

    return (
        <>
            {showPopup && (
                <div 
                    onClick={() => setShowPopup(false)}
                    className="flex items-center justify-center fixed top-0 left-0 right-0 bg-black/80 min-h-[100vh] z-60"
                >
                    <div
                        onClick={e => e.stopPropagation()} // Stops setShowPopup from firing when user clicks modal item window
                        className="bg-slate-900 my-8 p-4 rounded-lg max-w-md"
                    >
                        <div className="overflow-y-scroll p-2" style={{maxHeight: 'calc(100vh - 100px)'}}>
                            <h2 className="text-3xl font-bold text-center text-white mb-3">{name}</h2>
                            <Image src={image} alt={name} width={300} height={200} className="mx-auto rounded-lg" />
                            <p className="text-center text-gray-300 text-lg my-3">{description}</p>
                            { sizes?.length > 0 && (
                                <div>
                                    <h3 className="text-xl uppercase text-white font-bold">Sizes</h3>
                                    { sizes?.map(size => (
                                        <label 
                                            key={size._id}
                                            className="flex items-center gap-2 p-2 border rounded-md mb-1 text-white"
                                        >
                                            <input 
                                                type="radio" 
                                                name="size"
                                                onChange={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                            /> {size.name} ${basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}

                            { extraIngredientPrices?.length > 0 && (
                                <div>
                                    <h3 className="text-xl uppercase text-white font-bold">Extras</h3>
                                    { extraIngredientPrices?.map(extraIngredient => (
                                        <label 
                                            key={extraIngredient._id}
                                            className="flex items-center gap-2 p-2 border rounded-md mb-1 text-white"
                                        >
                                            <input 
                                                type="checkbox" 
                                                name={extraIngredient.name}
                                                onClick={e => handleExtraIngredientClick(e, extraIngredient)}
                                            /> 
                                            {extraIngredient.name} ${extraIngredient.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <div className="flex flex-col justify-center items-center gap-1 mt-4">
                                <button onClick={handleAddToCartButtonClick}
                                    className='bg-yellow-700 text-white rounded-full px-14 py-1'
                                >
                                    Add to cart - <span className="text-2xl font-semibold">${selectedPrice}</span>
                                </button>
                                <button onClick={() => setShowPopup(false)}
                                    className='bg-slate-200 text-black rounded-full px-24 py-2'
                                >
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
        </>
    )
}