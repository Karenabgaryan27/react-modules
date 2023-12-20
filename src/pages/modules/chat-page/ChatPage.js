import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context";
import { Header, Footer, BasicChat, PopupChat } from "../../../components";
import useFetch from "../../../hooks/useFetch";

function BasicChatSection() {
    const { getChatGPTMessage } = useFetch();

    const processMessageToChatGPT = async (newMessages) => {
        const apiMessages = newMessages.map((item) => {
            const role = item.sender.toLowerCase() === "chatbot" ? "assistant" : "user";
            return { role, content: item.message };
        });

        const data = await getChatGPTMessage(undefined, apiMessages);
        return data.choices[0].message.content;
    };

    return (
        <section>
            <div className="container">
                <h2 className="display-2">basic chat</h2>
                <BasicChat callback={processMessageToChatGPT} />
            </div>
        </section>
    );
}

function PopupChatBlock() {
    const { getChatGPTMessage } = useFetch();

    const processMessageToChatGPT = async (newMessages) => {
        const apiMessages = newMessages.map((item) => {
            const role = item.sender.toLowerCase() === "chatbot" ? "assistant" : "user";
            return { role, content: item.message };
        });

        const data = await getChatGPTMessage(undefined, apiMessages);
        return data.choices[0].message.content;
    };

    return <PopupChat callback={processMessageToChatGPT} />;
}

export default function ChatPage() {
    const { pageFade } = useGlobalContext().animations;

    return (
        <>
            <Header title="chat" />
            <motion.main {...pageFade} className="rest-page">
                <BasicChatSection />
                <PopupChatBlock />
            </motion.main>
            <Footer />
        </>
    );
}
