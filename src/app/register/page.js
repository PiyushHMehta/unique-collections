'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [creatingUser, setCreatingUser] = useState(false)
    const [userCreated, setUserCreated] = useState(false)
    const [error, setError] = useState(false)

    async function handleFormSubmit(ev) {
        ev.preventDefault()
        setCreatingUser(true)

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {
            setError(true)
            setUserCreated(false)
        } else {
            setError(false)
            setUserCreated(true)
        }
        setCreatingUser(false)
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            {
                userCreated && (
                    <div className="my-4 text-center">
                        User created, now may <Link href={'/login'} className="underline">login &raquo;</Link>
                    </div>
                )
            }
            {
                error && (
                    <div className="my-4 text-center">
                        Error. <br /> Please try again later
                    </div>
                )
            }
            <form onSubmit={handleFormSubmit}
                className="block max-w-sm mx-auto">
                <input type="email" placeholder="Email" disabled={creatingUser}
                    value={email} onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="Password" disabled={creatingUser}
                    value={password} onChange={ev => setPassword(ev.target.value)} />
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">or Login with provider</div>
                <button type="button" onClick={() => signIn('google', {
                    callbackUrl: '/'
                })}
                    className="flex items-center gap-4 justify-center">
                    <Image src="/google-icon.png" alt="" width={32} height={32} />
                    Login w/ Google
                </button>

                <div className="text-center my-4">
                    Existing account? <Link href={'/login'} className="underline">Login here &raquo;</Link>
                </div>
            </form>

        </section>
    )
}