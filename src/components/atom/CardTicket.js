import React from 'react'

export default function CardTicket({ header, children }) {
    return (
        <div className="mb-5">
            <div className="bg-gray-700 px-5 py-2 w-full rounded-t border-b">
                {header}
            </div>
            <div className="bg-white w-full px-5 py-4 rounded-b">
                {children}
            </div>
        </div>
    )
}
