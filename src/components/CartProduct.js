import Image from "next/image"
import { cartProductPrice } from "./AppContext"
import { FaRegTrashAlt } from "react-icons/fa"

export default function CartProduct({product, onRemove, index}) {
    return (
        <div className="flex items-center gap-4 mb-2 border-b py-2 text-white" key={product._id}>
            <div className="w-24">
                <Image width={200} height={200} src={product.image} alt={''} />
            </div>
            <div className="grow"> {/* Grow aligns elements evenly */}
                <h3 className="text-lg font-bold">{product.name}</h3>
                { product?.size && (
                    <div className="text-sm text-gray-300">
                        <span className="font-semibold">{product?.size?.name} <span className="font-bold text-lg">${product?.basePrice + product?.size?.price}</span></span>
                    </div>
                )}
                { product?.extras?.length > 0 && (
                    <div className="text-sm text-gray-300">
                        {product?.extras?.map(extra => (
                            <div key={extra.name}>
                                {extra.name} <span className="font-bold text-lg">${extra.price}</span>
                            </div>
                        ))}

                    </div>
                )}
            </div>
            <div className="text-lg font-bold">
                ${cartProductPrice(product)}
            </div>
            { onRemove && (
                <div className="ml-2">
                    <button type="button" onClick={() => onRemove(index)}
                        className='text-white rounded-lg px-4 py-2 border-2 border-white hover:bg-primary'
                    >
                        <FaRegTrashAlt />
                    </button>
                </div>
            )}
        </div>  
    )
}