import { useState } from "react"

export default function DeleteButton({ label, onDelete }) {
    const [ showConfirm, setShowConfirm ] = useState(false) 

    if (showConfirm) {
        return (
            <div className="bg-black/80 fixed inset-0 top-0 left-0 flex items-center justify-center h-full">
                <div className="bg-white p-4 rounded-lg">
                    <div>Are you sure you want to delete?</div>
                    <div className="flex gap-2 mt-2">
                        <button type="button" onClick={() => setShowConfirm(false)}
                            className="p-3 mt-4 rounded-lg bg-white text-black text-lg font-semibold"
                        >
                            Cancel
                        </button>
                        <button type="button" onClick={() => {
                            onDelete
                            setShowConfirm(false)
                        }}
                            className="p-3 mt-4 rounded-lg bg-primary text-white text-lg font-semibold"
                        >
                            Yes, delete item
                        </button>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)}
            className="p-3 mt-2 rounded-lg bg-primary text-white text-lg font-semibold"
        >
            { label }
        </button>
    )
}