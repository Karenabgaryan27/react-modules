import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context";
import { Header,Footer } from "../../../components";

export default function SendEmailPage() {
    const { pageFade } = useGlobalContext().animations;
    const { sendEmail } = useGlobalContext();

    return (
        <>
            <Header title="send email" />
            <motion.main {...pageFade} className="button-page">
                <section id="receive-email">
                    <div className="container">
                        <h2 className="display-2">receive email (formsubmit.co)</h2>
                        {/* ccac0d1a20b73eaa7db1c2c206f8f371   */}
                        <form className="row" action="https://formsubmit.co/karenabgaryantest@gmail.com" method="POST">
                            {/* Honeypot  */}
                            <input type="text" name="_honey" style={{ display: "none" }} />

                            {/* Disable Captcha  */}
                            <input type="hidden" name="_captcha" defaultValue="false" />

                            {/* <input
                                type="hidden"
                                name="_next"
                                value="http://127.0.0.1:5501/src/pages/helpers/send-email/success.html"
                            /> */}

                            <div className="col">
                                <label htmlFor="fullName" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Full&nbsp;Name"
                                    id="fullName"
                                    required
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="email" className="form-label">
                                    E-mail
                                </label>
                                <input type="email" className="form-control" name="email" id="email" required />
                            </div>
                            <div className="col">
                                <label htmlFor="message" className="form-label">
                                    message
                                </label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <br />
                            <button>
                                Submit
                            </button>
                        </form>
                    </div>
                </section>

                <section id="receive-message">
                    <div className="container">
                        <h2 className="display-2">receive message (EmailJS)</h2>
                        <form
                            className="row"
                            id="contact-form"
                            action="#/"
                            method="POST"
                            onSubmit={(e) =>
                                sendEmail({
                                    event: e,
                                    service: "service_af8zoih",
                                    template: "template_mtf61lg",
                                    form: e.target,
                                    public_key: "KkCk5FtOVSLP_RCoX",
                                })
                            }
                        >
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" />
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" />
                            <label>Message</label>
                            <textarea name="message" className="form-control"></textarea>
                            <br />
                            <button>
                                Submit
                            </button>
                        </form>
                    </div>
                </section>

                <section id="send-message">
                    <div className="container">
                        <h2 className="display-2">send message (EmailJS)</h2>
                        <form
                            className="row"
                            id="contact-form-2"
                            action="#/"
                            method="POST"
                            onSubmit={(e) =>
                                sendEmail({
                                    event: e,
                                    service: "service_af8zoih",
                                    template: "template_4y0cegk",
                                    form: e.target,
                                    public_key: "KkCk5FtOVSLP_RCoX",
                                })
                            }
                        >
                            <input type="hidden" name="hidden_text" value="this is hidden text" className="form-control" />
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" />
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" placeholder="type correct email" />
                            <label>Message</label>
                            <textarea name="message" className="form-control"></textarea>
                            <br />
                            <button>
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
            </motion.main>
            <Footer/>
        </>
    );
}
