import React, { useState, useEffect } from "react";

export default function Field({
    label,
    name,
    color = "primary",
    placeholder = "",
    type,
    callback = () => {},
    value = "",
    className = "",
    inputClassName = "",
    required = false,
    successMessage = "looks good",
    errorMessage = "error",
    Tag = "input",

    onKeyDown = null,
}) {
    const [_value, _setValue] = useState(value);

    useEffect(() => {
        _setValue(value);
    }, [value]);

    const onChange = (e) => {
        _setValue(e.target.value);
        callback(e);
    };

    return (
        <div className={`field ${className}`}>
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label} {required && "*"}
                </label>
            )}
            <div className="input-group">
                <Tag
                    type={type}
                    name={name}
                    id={name}
                    className={`form-control form-control-${color} ${inputClassName}`}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    value={_value}
                    required={required}
                />
                <div className="valid-feedback">{successMessage}</div>
                <div className="invalid-feedback">{errorMessage}</div>
            </div>
        </div>
    );
}
