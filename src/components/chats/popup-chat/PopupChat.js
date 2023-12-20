import React, { useState, useEffect, useRef } from "react";
import localData from "../../../localData";
import { Button, Field } from "../../";

const localRequest = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("bot response");
        }, 2000);
    });
};

const getDate = () => {
    let date = new Date();

    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hour = date.getHours();

    let year = date.getFullYear();
    let month = date.getMonth(); // beware: January = 0; February = 1, etc.
    let day = date.getDate();

    let dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, etc.
    let milliSeconds = date.getMilliseconds();

    return `${hour}:${minutes}`;
};

const BouncingDotsLoader = (props) => {
    return (
        <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

const Message = ({ message = "message", sender = "", date = "" }) => {
    return (
        <div className={`message position-${sender.toLowerCase() === "user" ? "right" : "left"}`}>
            <div className="details">
                <div className="details-identity">{sender}</div>
                <div className="details-date">{date}</div>
            </div>
            <div className="message-text">{message}</div>
        </div>
    );
};

export default function PopupChat({ callback = localRequest }) {
    const [messages, setMessages] = useState([
        { message: "Hello there!", sender: "ChatBot", date: getDate() },
        { message: "What brings you here today?", sender: "ChatBot", date: getDate() },
    ]);

    const [value, setValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const [display, setDisplay] = useState("none");
    const [isOpen, setIsOpen] = useState(false);

    const chatLogRef = useRef(null);

    const { send, close, chat } = localData.svgs;
    // const { ellipsisPreloader } = localData.images;

    const createBotMessage = async (newMessages) => {
        const response = await callback(newMessages);
        return { message: response, sender: "ChatBot", date: getDate() };
    };

    const createUserMessage = () => {
        return { message: value, sender: "user", date: getDate() };
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSend = async () => {
        setValue("");

        const userMessage = createUserMessage();
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setTimeout(() => setIsTyping(true), 1000);

        const botMessage = await createBotMessage(newMessages);
        setMessages([...newMessages, botMessage]);
        setIsTyping(false);
    };

    const onKeyDown = (e) => {
        if (e.key !== "Enter") return;
        // e.target.blur()
        handleSend();
    };

    useEffect(() => {
        if (display === "none") return;
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        if (display === "none") return;
        setIsOpen(true);
    }, [display]);

    return (
        <div className="popup-chat-backdrop">
            {display === "block" && (
                <div
                    className={`popup-chat ${isOpen ? "show" : ""}`}
                    onTransitionEnd={() => !isOpen && setDisplay("none")}
                >
                    <div className="popup-chat-inner" onTransitionEnd={(e) => e.stopPropagation()}>
                        <div className="popup-chat-header">
                            <h2 className="popup-chat-title">chat with us!</h2>
                            <Button
                                className="close-btn"
                                variant="circle"
                                icon={close}
                                onClick={() => setIsOpen(false)}
                            />
                        </div>

                        <div className="popup-chat-body">
                            <div className="chat-log" ref={chatLogRef}>
                                {!messages || !messages.length
                                    ? "empty"
                                    : messages.map((item, index) => <Message key={index} {...item} />)}
                                {/* {isTyping && <img className="load" src={ellipsisPreloader} alt="" />} */}
                                {isTyping && <BouncingDotsLoader />}
                            </div>
                        </div>

                        <div className="popup-chat-footer">
                            <div className="wrapper">
                                <Field
                                    value={value}
                                    variant="text"
                                    placeholder="Write a message..."
                                    color="secondary"
                                    callback={handleChange}
                                    onKeyDown={onKeyDown}
                                />
                                <Button
                                    className="send-btn"
                                    icon={send}
                                    variant="contained"
                                    onClick={handleSend}
                                    disabled={!value}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Button
                variant="circle"
                className="popup-chat-toggle show"
                icon={chat}
                onClick={() => setDisplay("block")}
            />
        </div>
    );
}
