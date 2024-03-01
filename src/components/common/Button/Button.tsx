import React from 'react'
import style from "./Button.module.scss"
export default function Button({btnClass, tittle, onClick} : Button) {
    return (
        <button onClick={onClick} className={`btn ${btnClass} ${style.commonBtn}`}>{tittle}</button>
    )
}