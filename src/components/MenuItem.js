import { CartContext } from "./AppContext"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import MenuItemTile from "./MenuItemTile"
import Image from "next/image"

export default function MenuItem (menuItem) {
    const { image, name, description, basePrice, sizes, extraIngredientPrices } = menuItem
    const {addToCart} = useContext(CartContext)
    const [ showPopup, setShowPopup ] = useState(false)  

    function handleAddToCartButtonClick() {
        if( sizes.length === 0 && extraIngredientPrices.length === 0 ) {
            addToCart(menuItem)
            toast.success('Added to cart!')
        } else {
            setShowPopup(true)
        }
    }

    return (
        <>
            {showPopup && (
                <div className="flex items-center justify-center fixed top-0 left-0 right-0 bg-black/80">
                    <div className="bg-slate-800 my-8 p-4 rounded-lg max-w-md max-h-screen overflow-scroll">
                    <h2 className="text-3xl font-bold text-center text-white mb-4">{name}</h2>
                        <Image src={image} alt={name} width={300} height={200} className="mx-auto" />
                        <p className="text-center text-gray-300 text-sm mb-4">{description}</p>
                        { sizes?.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold">Sizes</h3>
                                { sizes?.map(size => (
                                    <label className="flex items-center gap-2 p-2 border rounded-md mb-1">
                                        <input type="radio" name="size"/> {size.name} ${basePrice + size.price}
                                    </label>
                                ))}
                            </div>
                        )}

                        { extraIngredientPrices?.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold">Extra Ingredients</h3>
                                { extraIngredientPrices?.map(extraIngredient => (
                                    <label className="flex items-center gap-2 p-2 border rounded-md mb-1">
                                        <input type="checkbox" name={extraIngredient.name}/> {extraIngredient.name} ${extraIngredient.price}
                                    </label>
                                ))}
                            </div>
                        )}

                        <button className='bg-primary text-white rounded-full px-6 py-2'>
                            Add to cart
                        </button>
                    </div>
                </div>
            )}
            <MenuItemTile 
                onAddToCart={handleAddToCartButtonClick}
                {...menuItem}
            />

        </>
    )
}