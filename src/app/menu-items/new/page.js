'use client'

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm"

export default function NewMenuItemPage() {
    const { loading, data } = useProfile()
    const [menuItem, setMenuItem] = useState(null)
    const [redirectTo, setRedirectTo] = useState('')

    async function handleFormSubmit(ev, data) {
        ev.preventDefault()
        const savingPromise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items', {
                method: "POST",
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
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Failed to save'
        })

        setMenuItem(null)
        setRedirectTo('/menu-items')
    }

    if(redirectTo) {
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
            <div className="mt-8">
                <Link href={'/menu-items'} className="button flex justify-center gap-2 items-center">
                    Show all menu items
                    <Left />
                </Link>
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />

        </section>
    )
}