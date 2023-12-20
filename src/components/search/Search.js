import React from "react";
import { Button } from "../";
import localData from "../../localData";

export default function Search({
    label,
    className = "",
    name,
    type,
    required,
    onChange,
    placeholder = "search",
    variant,
    color = 'primary',
}) {
    const { search } = localData.svgs;

    return (
        <div className={`search ${className}`}>
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label} {required && "*"}
                </label>
            )}
            <div className="input-group">
                <input
                    type={type}
                    name={name}
                    id={name}
                    className={`form-control form-control-${color}`}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                <Button variant={variant} color={color} className="search-toggler" icon={search} />
            </div>
        </div>
    );
}
