import Image from "next/image"
import { cartProductPrice } from "./AppContext"
import { FaRegTrashAlt } from "react-icons/fa"

export default function CartProduct({product, onRemove, index}) {
    return (
        <div className="flex border-b border-white py-4" key={product._id}>
            <div className="flex items-center w-1/2">
                <div className="w-32 md:mr-4">
                    <Image width={200} height={200} src={product.image} alt={''} className="rounded-lg" />
                </div>
                <div className="grow text-white">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    { product?.size && (
                        <div className="text-sm">
                            <span className="font-semibold">{product?.size?.name} <span className="font-bold text-lg">${product?.basePrice + product?.size?.price}</span></span>
                        </div>
                    )}
                    { product?.extras?.length > 0 && (
                        <div className="text-sm">
                            {product?.extras?.map(extra => (
                                <div key={extra.name}>
                                    {extra.name} <span className="font-bold text-lg text-white">${extra.price}</span>
                                </div>
                            ))}

                        </div>
                    )}
                </div>
            </div>
            
            <div className="flex w-1/2 items-center justify-end px-4 gap-2">
                <div className="text-xl font-bold text-white">
                    ${cartProductPrice(product)}
                </div>
                { onRemove && (
                    <div className="ml-2">
                        <button type="button" onClick={() => onRemove(index)}
                            className='rounded-lg px-4 py-2 border-2 border-white hover:bg-primary'
                        >
                            <FaRegTrashAlt className="text-gray-400" />
                        </button>
                    </div>
                )}
            </div>
        </div>  
    )
}