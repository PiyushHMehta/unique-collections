'use client'

import Trash from "@/components/icons/Trash";
import Edit from "@/components/icons/Edit";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
    const { loading: profileLoading, data: profileData } = useProfile()
    const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState(null)

    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(data => {
                const sortedCategories = data.sort((a, b) => a.name.localeCompare(b.name));
                setCategories(sortedCategories);
            })
        })
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault()
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName }
            if (editedCategory) {
                data._id = editedCategory._id
            }

            const res = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            setCategoryName('')
            fetchCategories()
            setEditedCategory(null)
            if (res.ok) {
                resolve()
            } else {
                reject()
            }
        })
        await toast.promise(creationPromise, {
            loading: editedCategory ? 'Updating Category' : 'Creating a new category...',
            success: editedCategory ? 'Category Updated' : 'New Category created',
            error: editedCategory ? 'Error updating category' : 'Error creating new category'
        })
    }

    async function handleDelete(_id) {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/categories?_id='+_id, {
                method: 'DELETE',            
            })
            if(res.ok) {
                resolve()
            } else {
                reject()
            }
        })

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Failed to delete'
        })

        fetchCategories()
    }

    if (profileLoading) {
        return 'Loading user info...'
    }

    if (!profileData.admin) {
        return 'Not an admin'
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <form onSubmit={handleCategorySubmit} className="mt-8">
                <div className="md:flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update Category' : 'New Category Name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text" value={categoryName}
                            onChange={ev => setCategoryName(ev.target.value)} />
                    </div>
                    <div className="flex gap-1 pb-2">
                        <button type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={() => {setEditedCategory(null), setCategoryName('')}}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing Category:</h2>
                {
                    categories && categories.length > 0 && categories.map(category => (
                        <div key={category._id} className="rounded-xl p-2 px-4 flex items-center gap-1 mb-2 bg-gray-100">
                            <div className="grow font-semibold">
                                {category.name}
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => {
                                    setEditedCategory(category);
                                    setCategoryName(category.name)
                                }} type="button">
                                    <Edit />
                                </button>
                                <button type="button" onClick={() => handleDelete(category._id)}>
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}