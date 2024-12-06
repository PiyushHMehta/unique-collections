import { useState } from "react"

export default function DeleteButton({ label, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false)

    if (showConfirm) {
        return (
            <div className="fixed bg-black/75 inset-0 flex items-center justify-center h-full">
                <div className="bg-white p-4 rounded-lg">
                    <h4 className="text-xl font-semibold">Confirm Delete</h4>
                    <div className="flex gap-2">
                        <button onClick={() => setShowConfirm(false)}>Cancel</button>
                        <button className="primary" onClick={onDelete}>Yes,&nbsp;Delete</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    )
}