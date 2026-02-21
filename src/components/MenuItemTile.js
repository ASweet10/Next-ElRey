import AddToCartButton from "./AddToCartButton"

export default function MenuItemTile ({onAddToCart, ...item}) {
    const { image, description, name, basePrice, sizes, extraIngredientPrices } = item
    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0

    return (
        <div className="flex flex-col bg-gray-200 rounded-lg w-[450px] max-h-[500px] 
                        shadow-md transition-all duration-300 ease-in-out
                        group hover:shadow-xl overflow-hidden">
            <div className="h-3/5 overflow-hidden">
                <img src={image} className="h-full w-[500px] rounded-t-lg object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 transform"/>
            </div>
            <div className="flex flex-col p-4 h-2/5">
                <div className="text-left h-20">
                    <h3 className="font-semibold mb-1 text-2xl">{name}</h3>
                    <p className="text-gray-900">{description}</p>
                </div>
                <div className="flex justify-end text-right pt-8">
                    <AddToCartButton 
                        hasSizesOrExtras={hasSizesOrExtras}
                        onClick={onAddToCart}
                        image={image}
                        basePrice={basePrice}
                    />
                </div>
            </div>
        </div>
    )
}