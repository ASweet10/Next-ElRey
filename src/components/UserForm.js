'use client'
import { useProfileInfo } from "@/hooks/useProfileInfo"
import EditableImage from "./EditableImage"
import { useState } from "react"

export default function UserForm({ user, onSave }) {

    const [ userName, setUserName ] = useState(user?.name || '')
    const [ image, setImage ] = useState(user?.image || '')
    const [ phone, setPhone ] = useState(user?.phone || '')
    const [ email, setEmail ] = useState(user?.email || '')
    const [ streetAddress, setStreetAddress ] = useState(user?.streetAddress || '')
    const [ city, setCity ] = useState(user?.city || '')
    const [ zipCode, setZipCode ] = useState(user?.zipCode || '')
    const [ usState, setUSState ] = useState(user?.usState || '')
    const [ admin, setAdmin ] = useState(user?.admin || false)
    const { data:loggedInUserData } = useProfileInfo()

    return (
        <div className="flex gap-4 items-center">
            <div className="flex">
                <div className="flex flex-col rounded-lg p-4 gap-3 justify-center">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>

            <form className="flex flex-col gap-2 text-black" 
                onSubmit={ e => onSave(e, {
                    name:userName, image, phone, email, streetAddress, city, zipCode, usState
                }) 
            }>
                <label className="text-white">Name</label>
                <input type="text" value={userName} onChange={(e)=> setUserName(e.target.value)} 
                    placeholder="First and last name" className="p-2 rounded-lg" 
                />
                <label className="text-white">Email</label>
                <input type="email" value={user?.email} disabled={true} className="p-2 rounded-lg text-white" />
                <label className="text-white">Phone Number</label>
                <input type="tel" placeholder="Phone Number" className="p-2 rounded-lg" 
                    value={phone} onChange={(e) => setPhone(e.target.value)}    
                />
                <label className="text-white">Street Address</label>
                <input type="text" placeholder="Street Address" className="p-2 rounded-lg" 
                    value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} 
                />
                <label className="text-white">City</label>
                <input type="text" placeholder="City" className="p-2 rounded-lg" 
                    value={city} onChange={(e) => setCity(e.target.value)} 
                />
                <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                        <label className="text-white">Zip Code</label>
                        <input type="text" placeholder="Zip Code" className="p-2 rounded-lg" 
                            value={zipCode} onChange={(e) => setZipCode(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white">State</label>
                        <input type="text" placeholder="State" className="p-2 rounded-lg" 
                            value={usState} onChange={(e) => setUSState(e.target.value)} 
                        />
                    </div>
                </div>
                {loggedInUserData?.admin && (
                    <div>
                        <label className="p-2 flex items-center gap-2 text-white text-lg">
                            <input id="adminCheckbox" type="checkbox" value={'1'}
                                checked={admin} onClick={e => setAdmin(e.target.checked)} 
                            />
                            Admin
                        </label>
                    </div>
                )}

                <button type="submit" className="px-12 py-3 mt-4 rounded-lg bg-primary text-white text-lg font-semibold">Save Changes</button>
            </form>
        </div>
    )
}