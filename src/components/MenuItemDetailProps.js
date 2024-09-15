import { MdDelete } from "react-icons/md"
import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

export default function MenuItemDetailProps ({ name, label, props, setProps }) {
    
    const [ isOpen, setIsOpen ] = useState(false)

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, {name: '', price: 0, id: oldProps.length - 1}]
        })
    }

    function editProp(e, index, prop) {
        const newValue = e.target.value
        setProps(prevSizes => {
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue
            return newSizes
        })
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove)) // Filter prev array; remove item with same index as prop
    }
    
    return (
        <div className=" bg-gray-200 p-2 rounded-md my-2">
            <button type="button" onClick={() => setIsOpen( prev => !prev)}
                className="p-1 justify-start inline-flex items-center gap-1"
            >
                { isOpen && ( <FaChevronUp className="text-primary text-lg" />) }
                { !isOpen && ( <FaChevronDown className="text-primary text-lg" />) }
                <span className="text-primary text-xl font-bold">{name}</span>
                <span className="text-primary text-xl font-bold">({ props?.length })</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                { props?.length > 0 && props.map((prop, index) => (
                    <div className="flex gap-2 items-end" key={index}>
                        <div>
                            <label className="text-black">Name</label>
                            <input type="text" placeholder="Extra price" className="rounded-lg p-1 text-black"
                                value={prop.name} onChange={e => editProp(e, index, 'name')} 
                            />
                        </div>
                        <div>
                            <label className="text-black">Extra price</label>
                            <input type="text" placeholder="Extra price" className="rounded-lg p-1 text-black"
                                value={prop.price} onChange={e => editProp(e, index, 'price')} 
                            />
                        </div>
                        <div>
                            <button type="button" onClick={() => removeProp(index)} className="rounded-lg p-2 bg-white">
                                <MdDelete className="text-red-600 text-3xl" />
                            </button>
                        </div>
                    </div>
                    
                ))}
                <button type="button" onClick={addProp} className="p-3 mt-4 rounded-lg bg-primary text-white text-lg font-semibold">
                    {label}
                </button>
            </div>
        </div>
    )
}