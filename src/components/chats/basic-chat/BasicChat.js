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

export default function BasicChat({ callback = localRequest }) {
    const [messages, setMessages] = useState([
        { message: "Hello there!", sender: "ChatBot", date: getDate() },
        { message: "What brings you here today?", sender: "ChatBot", date: getDate() },
    ]);

    const [value, setValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatLogRef = useRef(null);

    const { send, close } = localData.svgs;
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
        const userMessage = createUserMessage();
        const newMessages = [...messages, userMessage]
        setMessages(newMessages);
        setValue("");
        setTimeout(()=>setIsTyping(true),1000)
        
        
        const botMessage = await createBotMessage(newMessages);
        setMessages([...newMessages, botMessage]);
        setIsTyping(false);
    };

    const onKeyDown = (e)=>{
        if(e.key !== 'Enter')return
        // e.target.blur()
        handleSend()
    }

    useEffect(() => {
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className="basic-chat">
            <div className="basic-chat-header">
                <h2 className="basic-chat-title">chat with us!</h2>
                <Button className="close-btn" variant="circle" icon={close} />
            </div>

            <div className="basic-chat-body">
                <div className="chat-log" ref={chatLogRef}>
                    {!messages || !messages.length
                        ? "empty"
                        : messages.map((item, index) => <Message key={index} {...item} />)}
                    {/* {isTyping && <img className="load" src={ellipsisPreloader} alt="" />} */}
                    {isTyping && <BouncingDotsLoader />}
                </div>
            </div>

            <div className="basic-chat-footer">
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
    );
}
