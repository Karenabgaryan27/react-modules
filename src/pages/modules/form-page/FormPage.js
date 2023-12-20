import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context";
import { Header, Footer, Button, Field, FieldBtn, Search, SearchBtn, Textarea, TextareaBtn } from "../../../components";
import useFetch from "../../../hooks/useFetch";
import useJoiValidation from "../../../hooks/validation/joi-validation/useJoiValidation";

// TEXT FIELD
function TextFieldSection() {
    return (
        <section id="text-field">
            <div className="container">
                <h2 className="display-2">text field</h2>
                <br />

                <h3 className="display-5 text-secondary">fields</h3>
                <br />

                <div className="field">
                    <input type="text" name="name" id="name" className="form-control form-control-secondary" />
                </div>
                <br />

                <div className="field">
                    <label className="form-label" htmlFor="name">
                        with label
                    </label>
                    <div className="input-group">
                        <input type="text" name="name" id="name" className="form-control form-control-secondary" />
                    </div>
                </div>
                <br />

                <div className="field">
                    <label className="form-label" htmlFor="name">
                        with label and feedbacks*
                    </label>
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            minLength="3"
                            maxLength="10"
                            className="form-control form-control-secondary"
                            required
                        />
                        <div className="valid-feedback">looks good.</div>
                        <div className="invalid-feedback">name error.</div>
                    </div>
                </div>
                <br />

                <div className="field">
                    <label className="form-label" htmlFor="name">
                        with label and placeholder
                    </label>
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            minLength="3"
                            maxLength="10"
                            className="form-control form-control-secondary"
                            placeholder="placeholder"
                            required
                        />
                    </div>
                </div>
                <br />

                <fieldset style={{ padding: "10px 20px", border: "1px solid #ccc" }}>
                    <legend className="text-secondary">just react components version</legend>
                    <Field label="component field" />
                    <br />
                    <Field label="component field" color="secondary" placeholder="field" required={true} />
                </fieldset>
                <br />
                <br />
                <br />
                <br />

                <h3 className="display-5 text-secondary">field buttons</h3>
                <br />

                <FieldBtn label="text" placeholder="placeholder" />
                <br />

                <FieldBtn label="contained" variant="contained" placeholder="placeholder" />
                <br />

                <FieldBtn label="outlined" variant="outlined" placeholder="placeholder" />
            </div>
        </section>
    );
}

// VALIDATION
function ValidationSection() {
    const [wasValidated, setWasVaslidated] = useState(false);

    const onSubmit = (e) => {
        if (!e.currentTarget.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        setWasVaslidated(true);
    };

    return (
        <section id="validation">
            <div className="container">
                <h2 className="display-2">integrated validation</h2>
                <form
                    action="#/dsfd"
                    className={`contact-form needs-validation ${wasValidated ? "was-validated" : ""}`}
                    noValidate
                    onSubmit={onSubmit}
                >
                    {/* <div className="field">
                        <label className="form-label" htmlFor="name">
                            name*
                        </label>
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                minLength="3"
                                maxLength="10"
                                className="form-control form-control-secondary"
                                required
                            />
                            <div className="valid-feedback">looks good.</div>
                            <div className="invalid-feedback">name error.</div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="form-label" htmlFor="email">
                            email*
                        </label>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control form-control-secondary"
                                required
                            />
                            <div className="valid-feedback">looks good.</div>
                            <div className="invalid-feedback">email error.</div>
                        </div>
                    </div> */}
                    <Field name="name" label="name" required={true} errorMessage="name error" />
                    <br />

                    <Field name="email" label="email" type="email" required={true} errorMessage="email error" />
                    <br />

                    <Button variant="contained" className="submit" type="submit" name="submit" />
                </form>
            </div>
        </section>
    );
}

// JOI VALIDATION
function CustomJoiValidationSection() {
    const { validateContact } = useJoiValidation();
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const [state, setState] = useState({
        name: "",
        email: "",
    });

    const [result, setResult] = useState({});
    const [errorMessages, setErrorMessages] = useState([]);

    const onChange = (e) => {
        const { name, value } = e.target || e;
        setState({ ...state, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { error } = validateContact(state);
        if (!error) return;
        setWasSubmitted(true);
    };

    useEffect(() => setResult(validateContact(state)), [state]);

    useEffect(() => {
        if (!wasSubmitted) return;
        const errors = {};
        result?.error?.details.forEach((item, index) => {
            if (errors[item.path[0]]) return;
            errors[item.path[0]] = item.message;
        });
        setErrorMessages(errors);
    }, [result, wasSubmitted]);
    //

    // const [form, setForm] = useState([
    //     { name: "name", type: "text", required: true },
    //     { name: "email", type: "email", required: true },
    // ]);

    return (
        <section id="joi-validation">
            <div className="container">
                <h2 className="display-2">joi validation</h2>
                <form
                    action="#/dsfd"
                    className={`contact-form needs-validation ${wasSubmitted ? "was-submitted" : ""}`}
                    onSubmit={onSubmit}
                    // noValidate
                >
                    {/* {form.map((input, index) => {
                        return <Field key={index} {...input} {...{ state, errorMessages, onChangeHandler }} />;
                    })} */}

                    {/* <div className="field">
                        <label className="form-label" htmlFor="name">
                            name*
                        </label>
                        <div className={`input-group`}>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className={`form-control form-control-secondary ${
                                    errorMessages.name ? "is-invalid" : "is-valid"
                                }`}
                                value={state.name}
                                onChange={onChange}
                            />
                            <div className="valid-feedback">looks good.</div>
                            <div className="invalid-feedback">{errorMessages.name}</div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="form-label" htmlFor="email">
                            email*
                        </label>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className={`form-control form-control-secondary ${
                                    errorMessages.email ? "is-invalid" : "is-valid"
                                }`}
                                value={state.email}
                                onChange={onChange}
                            />
                            <div className="valid-feedback">looks good.</div>
                            <div className="invalid-feedback">{errorMessages.email}</div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="form-label" htmlFor="message">
                            message
                        </label>
                        <div className="input-group">
                            <textarea
                                type="text"
                                name="message"
                                id="message"
                                className="form-control form-control-secondary"
                            />
                            <div className="valid-feedback">looks good.</div>
                            <div className="invalid-feedback">message error.</div>
                        </div>
                    </div> */}
                    <Field
                        name="name"
                        label="name*"
                        errorMessage={errorMessages.name}
                        inputClassName={errorMessages.name ? "is-invalid" : "is-valid"}
                        value={state.name}
                        callback={onChange}
                    />
                    <br />

                    <Field
                        name="email"
                        label="email*"
                        errorMessage={errorMessages.email}
                        inputClassName={errorMessages.email ? "is-invalid" : "is-valid"}
                        value={state.email}
                        callback={onChange}
                    />
                    <br />

                    <Field name="message" label="message" Tag="textarea" />
                    <br />

                    <Button variant="contained" className="submit" type="submit" name="submit" />
                    <br />
                </form>
                <br />
                <br />
                <br />
                <hr />
                <br />
                <br />
                <br />

                <BtnFieldVersion />
            </div>
        </section>
    );
}

function BtnFieldVersion() {
    const { validateContact } = useJoiValidation();
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const [state, setState] = useState({
        name: "",
        email: "",
    });

    const [result, setResult] = useState({});
    const [errorMessages, setErrorMessages] = useState([]);

    const onChange = (e) => {
        const { name, value } = e.target || e;
        setState({ ...state, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { error } = validateContact(state);
        if (!error) return;
        setWasSubmitted(true);
    };

    useEffect(() => setResult(validateContact(state)), [state]);

    useEffect(() => {
        if (!wasSubmitted) return;
        const errors = {};
        result?.error?.details.forEach((item, index) => {
            if (errors[item.path[0]]) return;
            errors[item.path[0]] = item.message;
        });
        setErrorMessages(errors);
    }, [result, wasSubmitted]);

    return (
        <form
            action="#/dsfd"
            className={`contact-form needs-validation ${wasSubmitted ? "was-submitted" : ""}`}
            onSubmit={onSubmit}
            // noValidate
        >
            <FieldBtn
                name="name"
                label="name*"
                errorMessage={errorMessages.name}
                btnClassName={errorMessages.name ? "is-invalid" : "is-valid"}
                value={state.name}
                callback={onChange}
                placeholder="placeholder"
            />
            <br />
            <FieldBtn
                name="email"
                label="email*"
                variant="contained"
                errorMessage={errorMessages.email}
                btnClassName={errorMessages.email ? "is-invalid" : "is-valid"}
                value={state.email}
                callback={onChange}
                placeholder="placeholder"
            />
            <br />

            <FieldBtn name="message" label="message" variant="outlined" placeholder="placeholder" Tag="textarea" />
            <br />

            <Button variant="contained" className="submit" type="submit" name="submit" />
        </form>
    );
}

// FILE INPUT
const FileInputSection = () => {
    const image = useRef(null);
    const onChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => (image.current.src = reader.result);
    };
    return (
        <section>
            <div className="container">
                <h2 className="display-2">file input</h2>
                <input type="file" className="file-input" onChange={onChange} />
                <img className="file-image" src="" alt="" ref={image} />
            </div>
        </section>
    );
};

// SEARCH
function SearchSection() {
    return (
        <section>
            <div className="container">
                <h2 className="display-2">Search</h2>
                <br />

                <h3 className="display-6 text-secondary">searches</h3>
                <br />

                <div className="wrapper" style={{ maxWidth: "300px" }}>
                    <Search />
                    <br />
                    <Search label="with label" color="secondary" />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>

                <h3 className="display-6 text-secondary">search buttons</h3>
                <br />

                <div className="wrapper" style={{ maxWidth: "300px" }}>
                    <SearchBtn label="text" />
                    <br />
                    <SearchBtn label="contained" variant="contained" togglerColor="light" />
                    <br />
                    <SearchBtn label="outlined" variant="outlined" />
                </div>
            </div>
        </section>
    );
}

export default function FormPage() {
    const { pageFade } = useGlobalContext().animations;
    const { getUsers } = useFetch();

    return (
        <>
            <Header title="form" />
            <motion.main {...pageFade} className="form-page">
                <TextFieldSection />
                <ValidationSection />
                <CustomJoiValidationSection />
                <FileInputSection />
                <SearchSection />
            </motion.main>
            <Footer />
        </>
    );
}
