'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext"
import { useContext, useState, useEffect } from "react"
import Image from "next/image"
import { FaRegTrashAlt } from "react-icons/fa"
import AddressInputs from "@/components/AddressInputs"
import { useProfileInfo } from "@/hooks/useProfileInfo"
import toast from "react-hot-toast"

export default function CartPage () {
    const { cartProducts, removeCartProduct } = useContext(CartContext)
    const [ address, setAddress ] = useState({})
    const { data:profileData } = useProfileInfo()

    useEffect(() => {
        if(profileData?.city) {
            const { phone, streetAddress, city, zipCode, usState } = profileData
            const dataFromProfile = { phone, streetAddress, city, zipCode, usState }
            setAddress(dataFromProfile)
        }
    }, [profileData])
    
    let total = 0
    for (const product of cartProducts) {
        total += cartProductPrice(product)
    }
    
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => {
            return {...prevAddress, [propName]:value}
        })
    }
    
    return (
        <section className="mt-8">
            <h2 className="font-bold text-center text-5xl text-primary mb-8">Cart</h2>
            <div className="mt-4 grid gap-4 grid-cols-2">
                <div>
                    { cartProducts?.length === 0 && (
                        <div>No items in cart</div>
                    )}
                    { cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <div className="flex items-center gap-4 mb-2 border-b py-2" key={product._id}>
                            <div className="w-24">
                                <Image width={240} height={240} src={product.image} alt={''} />
                            </div>
                            <div className="grow"> {/* Grow aligns elements evenly */}
                                <h3 className="text-xl font-bold">{product.name}</h3>
                                { product?.size && (
                                    <div className="text-sm text-gray-300">
                                        <span className="font-semibold">{product?.size?.name} <span className="font-bold text-lg">${product?.basePrice + product?.size?.price}</span></span>
                                    </div>
                                )}
                                { product?.extras?.length > 0 && (
                                    <div className="text-sm text-gray-300">
                                        {product?.extras?.map(extra => (
                                            <div>
                                                {extra.name} <span className="font-bold text-lg">${extra.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-xl font-bold">
                                ${cartProductPrice(product)}
                            </div>
                            <div className="ml-2">
                                <button type="button" onClick={() => removeCartProduct(index)}
                                    className='text-white rounded-lg px-4 py-2 border-2 border-white hover:bg-primary'
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                        </div>      
                    ))}
                    <div className="py-4 text-right pr-16 text-xl">
                        Subtotal: <span className="font-bold">${total}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mx-6 bg-gray-900 rounded-lg p-4">
                    <h2 className="font-bold text-xl">Checkout</h2>
                    <form className="flex flex-col gap-2">
                        <AddressInputs 
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                    </form>
                </div>
            </div>
        </section>
    )
}