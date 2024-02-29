import React from 'react'

export default function Button({btnClass, tittle, onClick} : Button) {
    return (
        <button onClick={onClick} className={`btn ${btnClass}`}>{tittle}</button>
    )
}