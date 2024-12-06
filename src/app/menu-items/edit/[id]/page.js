'use client'

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm"
import DeleteButton from "@/components/DeleteButton"

export default function EditMenuItemPage() {
    const { id } = useParams()
    const { loading, data } = useProfile()
    const [menuItem, setMenuItem] = useState(null)

    const [redirectTo, setRedirectTo] = useState('')

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id)
                setMenuItem(item)
            })
        })
    }, [])


    async function handleFormEdit(ev, data) {
        ev.preventDefault()
        data = { ...data, _id: id }
        const savingPromise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items', {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.ok) {
                resolve()
            } else {
                reject()
            }
        })

        await toast.promise(savingPromise, {
            loading: 'Editing',
            success: 'Edited',
            error: 'Failed to edit'
        })

        setMenuItem(null)
        setRedirectTo('/menu-items')
    }

    async function handleDelete() {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items?_id='+id, {
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

        setRedirectTo('/menu-items')
    }

    if (redirectTo) {
        return redirect(redirectTo)
    }

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin';
    }



    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button flex justify-center gap-2 items-center">
                    Show all menu items
                    <Left />
                </Link>
            </div>

            <MenuItemForm onSubmit={handleFormEdit} menuItem={menuItem} />
            <div className="max-w-xs ml-auto mt-4">
                <div className="max-w-xs ml-auto pl-4">
                    <DeleteButton label={'Delete'} onDelete={handleDelete} />
                </div>
            </div>
        </section>
    )
}