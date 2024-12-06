import Trash from "@/components/icons/Trash"
import Plus from "@/components/icons/Plus"
import ToggleUp from "@/components/icons/ToggleUp"
import ToggleDown from "@/components/icons/ToggleDown"
import { useState } from "react"

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {
    const [isToggleDown, setIsToggleDown] = useState(false)

    function addProps() {
        setProps(oldSizes => {
            return [...oldSizes, {
                name: '',
                price: 0
            }]
        })
    }

    function editProps(ev, index, prop) {
        const newValue = ev.target.value
        setProps(prevSizes => {
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue
            return newSizes
        })
    }

    function removeProps(indexToRemove) {
        setProps(prev => prev.filter((_, index) => index !== indexToRemove))
    }
    return (
        <div className="bg-gray-200 p-2 mb-2 rounded-md">
            <button type="button" onClick={() => setIsToggleDown(!isToggleDown)}
                className="inline-flex gap-2 p-1 border-0">
                {isToggleDown ? <ToggleUp /> : <ToggleDown />}
                <span className="text-gray-700 font-semibold">{name}</span>
                <span>({props?.length})</span>
            </button>
            {
                isToggleDown && props?.length > 0 && props.map((size, index) => (
                    <div key={index} className="flex items-end gap-2">
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="Size"
                                value={size.name}
                                onChange={(ev) => editProps(ev, index, 'name')} />
                        </div>
                        <div>
                            <label>Extra Price</label>
                            <input type="text" placeholder="Extra price"
                                value={size.price}
                                onChange={(ev) => editProps(ev, index, 'price')} />
                        </div>
                        <div>
                            <button type="button"
                                onClick={() => removeProps(index)} className="bg-white mb-2 px-2">
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))
            }
            <button type="button" onClick={addProps}
                className="bg-white flex items-center justify-center gap-2">
                <span>{addLabel}</span>
                <Plus />
            </button>
        </div>
    )
}