import React from 'react'
import "./inputs.css"

export default function TextInput({label, type}) {
    return (
        <div className="text-input">
            <input type={type} required/>
            <label>{label}</label>
        </div>
    )
}
