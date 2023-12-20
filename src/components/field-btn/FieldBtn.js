import React, { useState,useEffect } from "react";
import { Button } from "..";

export default function FieldBtn({
    label,
    name,
    placeholder = "",
    type,
    callback = () => {},
    value = "",
    className = "",
    inputClassName = "",
    variant,
    color,
    required = false,
    successMessage = "looks good",
    errorMessage = "error",
    btnClassName = "",
    Tag = "input",
}) {
    const [_value, _setValue] = useState(value);

    useEffect(()=>{
        _setValue(value)
    },[value])

    const onChange = (e) => {
        _setValue(e.target.value);
        callback(e);
    };
    
    return (
        <div className={`field-btn ${className}`}>
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label} {required && "*"}
                </label>
            )}
            <div className="input-group">
                <Button
                    variant={variant}
                    color={color}
                    tabIndex={-1}
                    className={btnClassName}
                    onClick={(e) => e.preventDefault()}
                >
                    <Tag
                        type={type}
                        name={name}
                        id={name}
                        className={`form-control ${inputClassName}`}
                        onChange={onChange}
                        placeholder={placeholder}
                        value={_value}
                        required={required}
                    />
                </Button>
                <div className="valid-feedback">{successMessage}</div>
                <div className="invalid-feedback">{errorMessage}</div>
            </div>
        </div>
    );
}
