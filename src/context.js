import React, { useState, createContext, useContext } from "react";
import localData from "./localData";
import emailjs from "@emailjs/browser";
export const Context = createContext();

export default function Provider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [state, setState] = useState({
        fetchedData: null,
        localData,
    });

    const [animations, setAnimations] = useState({
        pageFade: {
            initial:{ opacity: 0 },
            animate:{ opacity: 1 },
            exit:{ opacity: 0 },
            transition:{ duration: 0.5 }
        },
        lazyLoad: {
            fadeUp: {
                initial:{ opacity: 0 },
                whileInView: {opacity: 1},
                // exit:{ opacity: 0 },
                // transition:{ duration: 0.5 }
            }
        }
    });

    const sendEmail = ({event,service,template,form,public_key}) => {
        event.preventDefault();
        emailjs.sendForm(service, template, form, public_key).then(
            (result) => {
                alert("success:"  + result);
            },
            (error) => {
                alert("error:" + error);
            }
        );
    };

    return (
        <Context.Provider
            value={{
                state,
                ...state,
                setState,
                isLoggedIn,
                setIsLoggedIn,
                animations,
                sendEmail
            }}
        >
            {children}
        </Context.Provider>
    );
}

export const useGlobalContext = () => useContext(Context);
