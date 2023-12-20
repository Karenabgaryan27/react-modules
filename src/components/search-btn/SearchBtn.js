import React from "react";
import { Button } from "../";
import localData from "../../localData";

export default function SearchBtn({
    label,
    className = "",
    name,
    type,
    required,
    onChange,
    placeholder = "search",
    variant,
    color = "primary",
    togglerVariant,
    togglerColor,
}) {
    const { search } = localData.svgs;

    return (
        <div className={`search-btn ${className}`}>
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label} {required && "*"}
                </label>
            )}
            <div className="input-group">
                <Button variant={variant} color={color} className="input-btn" tabIndex={-1}>
                    <input
                        type={type}
                        name={name}
                        id={name}
                        className={`form-control form-control-${color}`}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                </Button>
                <Button variant={togglerVariant} color={togglerColor} className="search-btn-toggler" icon={search} />
            </div>
        </div>
    );
}
