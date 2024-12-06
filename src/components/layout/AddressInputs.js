export default function AddressInputs({addressProps, setAddressProps}) {
    const {phoneNum, streetAddress, city, pinCode} = addressProps
    
    return (
        <>
            <small>Phone Number</small>
            <input type="tel" placeholder="Phone Number"
                value={phoneNum || ''} onChange={ev => setAddressProps('phoneNum', ev.target.value)} />

            <small>Street Address</small>
            <input type="text" placeholder="Street Address"
                value={streetAddress || ''} onChange={ev => setAddressProps('streetAddress', ev.target.value)} />

            <small>City and PinCode</small>
            <div className="flex items-center gap-2 mt-2 mb-6">
                <input type="text" placeholder="City" style={{ 'margin': '0' }}
                    value={city || ''} onChange={ev => setAddressProps('city', ev.target.value)} />
                <input type="text" placeholder="Pin Code" style={{ 'margin': '0' }}
                    value={pinCode || ''} onChange={ev => setAddressProps('pinCode', ev.target.value)} />
            </div>
        </>
    )
}