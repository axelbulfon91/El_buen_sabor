import React from 'react'

export const GridLayoutAdmin = ({ children }) => {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 8fr"
        }}>
            {children}
        </div>
    )
}
