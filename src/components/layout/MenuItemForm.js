import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [image, setImage] = useState(menuItem?.image || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [toppings, setToppings] = useState(menuItem?.toppings || []);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(data => {
                setCategories(data);
                // Set default category if none is selected
                if (!category && data.length > 0) {
                    setCategory(data[0]._id);
                }
            });
        });
    }, [category]);

    return (
        <form
            onSubmit={ev => onSubmit(ev, { image, name, description, category, basePrice, sizes, toppings })}
            className="mt-8 max-w-2xl mx-auto">
            <div className="md:grid gap-4 items-start" style={{ 'gridTemplateColumns': '.3fr .7fr' }}>
                <div>
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow">
                    <label>Item Name</label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} />

                    <label>Description</label>
                    <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />

                    <label>Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>

                    <label>Base Price</label>
                    <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)} />

                    <MenuItemPriceProps name={'Sizes'} addLabel={'Add item size'} props={sizes} setProps={setSizes} />

                    <MenuItemPriceProps name={'Extras'} addLabel={'Add toppings'} props={toppings} setProps={setToppings} />

                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    );
}
