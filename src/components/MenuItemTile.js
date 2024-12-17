import AddToCartButton from "./AddToCartButton"

export default function MenuItemTile ({onAddToCart, ...item}) {
    const { image, description, name, basePrice, sizes, extraIngredientPrices } = item
    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0
    return (
        <div className="p-2 gap-2 text-center flex flex-col items-center justify-center group mx-4">
            <h3 className="font-semibold mb-1 text-2xl">{name}</h3>
            <img src={image} className="max-h-auto max-h-40 rounded-lg"/>
            <p className="text-gray-300 mx-12">{description}</p>
            <AddToCartButton 
                hasSizesOrExtras={hasSizesOrExtras}
                onClick={onAddToCart}
                image={image}
                basePrice={basePrice}
            />
        </div>
    )
}