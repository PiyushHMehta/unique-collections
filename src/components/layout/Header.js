'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import Cart from "@/components/icons/Cart"
import Bars2 from "../icons/Bars2";

export default function Header() {
    const [openLinks, setOpenLinks] = useState(false)
    const session = useSession()
    // console.log(session);
    const status = session.status
    const userData = session?.data?.user
    const username = userData?.name.split(" ")[0] || userData?.email

    const { cartItems } = useContext(CartContext)

    function AuthLinks({ status }) {
        if (status === 'authenticated') {
            return (
                <>
                    <Link href={'/profile'} className="whitespace-nowrap">Hello, {username}</Link>
                    <button
                        onClick={() => signOut()}
                        className="bg-primary rounded-full text-white px-8 py-2 flex items-center justify-center">
                        Logout
                    </button>
                </>
            )
        } else {
            return (
                <>
                    <Link href={'/login'} className="">
                        Login
                    </Link>
                    <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
                        Register
                    </Link>
                </>
            )
        }
    }

    return (
        <header>
            <div className="flex items-center justify-between md:hidden">
                <Link href="/" className="text-primary font-semibold text-2xl">
                    Sapna Delights
                </Link>
                <div className="flex items-center gap-8">
                    <Link href={'/cart'} className="relative">
                        <Cart />
                        {cartItems?.length > 0 && (
                            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                    <button onClick={() => setOpenLinks(!openLinks)} className="p-1 border-0">
                        <Bars2 />
                    </button>
                </div>
            </div>
            {
                openLinks && (
                    <div className="md:hidden p-4 bg-gray-200 rounded-lg mt-2"
                        onClick={() => setOpenLinks(false)}>
                        <nav className="flex flex-col items-center gap-2 text-center text-gray-500 font-semibold">
                            <Link href={'/'}>Home</Link>
                            <Link href={'/menu'}>Menu</Link>
                            <Link href={'/#about'}>About</Link>
                            <Link href={'/#contact'}>Contact</Link>
                            <AuthLinks status={status} />
                        </nav>
                    </div>
                )
            }


            <div className="hidden md:flex items-center justify-between">
                <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                    <Link href="/" className="text-primary font-semibold text-2xl">
                        Sapna Delights
                    </Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/#about'}>About</Link>
                    <Link href={'/#contact'}>Contact</Link>
                </nav>
                <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                    <AuthLinks status={status} />
                    <Link href={'/cart'} className="relative">
                        <Cart />
                        {cartItems?.length > 0 && (
                            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    )
}