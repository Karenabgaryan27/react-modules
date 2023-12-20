import React from "react";

export default function Switch({checked=false,color='primary', label=''}) {
    return (
        <label className="form-check">
            <input type="checkbox" className="form-check-input" defaultChecked={checked} />
            <div className="wrapper">
                <div className={`form-check-switch text-${color}`}></div>
            </div>
           {label && <span className="form-check-label">{label}</span>}
        </label>
    );
}
