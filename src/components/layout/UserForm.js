import { useState } from "react"
import Image from "next/image"
import { useProfile } from "../UseProfile"
import AddressInputs from "@/components/layout/AddressInputs"

export default function UserForm({ user, onSave }) {
    const [username, setUsername] = useState(user?.name || '')
    const [phoneNum, setPhoneNum] = useState(user?.phoneNum || '')
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '')
    const [city, setCity] = useState(user?.city || '')
    const [pinCode, setPinCode] = useState(user?.pinCode || '')
    const [admin, setAdmin] = useState(user?.admin || false)
    const { data: loggedInUserData } = useProfile()

    function handleAddressChange(propName, value) {
        if (propName === 'phoneNum') setPhoneNum(value)
        if (propName === 'streetAddress') setStreetAddress(value)
        if (propName === 'city') setCity(value)
        if (propName === 'pinCode') setPinCode(value)
    }

    return (
        <div className="md:flex gap-4">
            <div>
                <div className="rounded-lg">
                    <Image src={user?.image || ''} height={128} width={128}
                        alt="Avatar" quality={100}
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
            </div>
            <form onSubmit={(ev) => onSave(ev, {
                name: username, phoneNum, streetAddress, city, pinCode, admin
            })} className="grow">
                <small>Full Name</small>
                <input type="text" placeholder="Full Name"
                    value={username} onChange={ev => setUsername(ev.target.value)} />

                <small>Email ID</small>
                <input type="email" value={user?.email} disabled={true} />

                <AddressInputs addressProps={{ phoneNum, streetAddress, city, pinCode }}
                    setAddressProps={handleAddressChange} />

                {
                    loggedInUserData?.admin && (
                        <div>
                            <label htmlFor="adminCb" className="p-2 inline-flex items-center gap-2">
                                <input id="adminCb" type="checkbox"
                                    checked={admin} onChange={ev => setAdmin(ev.target.checked)} />
                                <span className="text-blue-500">Admin</span>
                            </label>
                        </div>
                    )
                }

                <button type="submit">Save</button>
            </form>
        </div>
    )
}