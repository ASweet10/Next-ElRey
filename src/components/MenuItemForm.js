import EditableImage from "@/components/EditableImage"
import { useState } from "react"
import MenuItemDetailProps from "./MenuItemDetailProps"

export default function MenuItemForm({onSubmit, menuItem}) {

    const [ image, setImage ] = useState(menuItem?.image || '')
    const [ name, setName ] = useState(menuItem?.name || '')
    const [ description, setDescription ] = useState(menuItem?.description || '')
    const [ basePrice, setBasePrice ] = useState(menuItem?.basePrice || 0)
    const [ sizes, setSizes ] = useState(menuItem?.sizes || [])
    const [ extraIngredientPrices, setExtraIngredientPrices ] = useState(menuItem?.extraIngredientPrices || [])

    return (
        <form className="flex flex-col items-start max-w-xl mx-auto gap-2 mt-8" 
            onSubmit={e => onSubmit(e, {image, name, description, basePrice, sizes, extraIngredientPrices})}
        >
            <div className="flex gap-4">
                <div className="max-w-[200px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-lg">Name</label>
                    <input className="py-2 px-4 rounded-lg text-black"
                        type="text" value={name} onChange={e => setName(e.target.value)}
                    />
                    <label className="text-lg">Description</label>
                    <input className="py-2 px-4 rounded-lg text-black"
                        type="text" value={description} onChange={e => setDescription(e.target.value)}
                    />
                    <label className="text-lg">Base price</label>
                    <input className="py-2 px-4 rounded-lg text-black"
                        type="text" value={basePrice} onChange={e => setBasePrice(e.target.value)}
                    />
                    <MenuItemDetailProps name={'Sizes'} label={'Add new item size'} 
                        props={sizes} setProps={setSizes} 
                    />
                    <MenuItemDetailProps name={'Extra ingredients'} label={'Add ingredients & prices'}
                        props={extraIngredientPrices} setProps={setExtraIngredientPrices}
                    />   
                    <button type="submit" className="px-12 py-3 mt-3 rounded-lg bg-primary text-white text-lg font-semibold">Save</button>
                </div>
            </div>

        </form>
    )
}