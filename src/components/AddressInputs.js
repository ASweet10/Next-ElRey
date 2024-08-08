export default function AddressInputs({ addressProps, setAddressProp }) {
    const { phone, streetAddress, city, zipCode, usState } = addressProps
    return (
        <>
            <label className="text-white">Phone Number</label>
            <input type="tel" placeholder="Phone Number" className="p-2 rounded-lg text-black" 
                value={phone || ''} onChange={e => setAddressProp('phone', e.target.value)}    
            />
            <label className="text-white">Street Address</label>
            <input type="text" placeholder="Street Address" className="p-2 rounded-lg text-black" 
                value={streetAddress || ''} onChange={e => setAddressProp('streetAddress', e.target.value)} 
            />
            <label className="text-white">City</label>
            <input type="text" placeholder="City" className="p-2 rounded-lg text-black" 
                value={city || ''} onChange={e => setAddressProp('city', e.target.value)} 
            />
            <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                    <label className="text-white">Zip Code</label>
                    <input type="text" placeholder="Zip Code" className="p-2 rounded-lg text-black" 
                        value={zipCode || ''} onChange={e => setAddressProp('zipCode', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-white">State</label>
                    <input type="text" placeholder="State" className="p-2 rounded-lg text-black" 
                        value={usState || ''} onChange={e => setAddressProp('usState', e.target.value)} 
                    />
                </div>
            </div>
        </>
    )
}