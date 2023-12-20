import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context";
import {
    Header,
    Footer,
    Dropdown,
    Select,
    MultiSelect,
    Autocomplete,
    Accordion,
    ControlledAccordion,
    Drawer,
    Button,
    Modal,
    NestedModal,
    Tabs,
} from "../../../components";
import localData from "../../../localData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

// DROPDOWN
function DropdownSection() {
    const { edit } = localData.svgs;
    const { flag } = localData.images;

    const [items, setItems] = useState([
        { title: "item 1", isActive: false, id: uuidv4() },
        { title: "item 2", isActive: false, id: uuidv4() },
        { title: "item 3", isActive: false, id: uuidv4() },
    ]);
    const [items_2, setItems_2] = useState([
        { title: "item 1", isActive: false, id: uuidv4() },
        { title: "item 2", isActive: false, id: uuidv4() },
        { title: "item 3", isActive: false, id: uuidv4() },
    ]);
    const [items_3, setItems_3] = useState([
        { title: "item", endIcon: edit, isActive: false, id: uuidv4() },
        { title: "lorem ipsum dolor ", startIcon: edit, isActive: false, id: uuidv4() },
        { title: "america", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "mexico", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "argentina", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "canada", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "france", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "spain", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "united kingdom", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
    ]);

    // API
    const [apiItems, setApiItems] = useState([]);

    const filterItems = (data) => {
        let tempApiItems = [];
        tempApiItems = data.map(({ title, thumbnailUrl, id }, index) => {
            return { title, startIcon: <img src={thumbnailUrl} />, id };
        });
        setApiItems(tempApiItems);
    };

    const { getProducts } = useFetch();

    useEffect(() => {
        getProducts((err, data) => filterItems(data));
    }, []);
    //

    return (
        <section id="dropdown">
            <div className="container">
                <h2 className="display-2">dropdown</h2>
                <div className="dropdown-group" style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
                    <Dropdown {...{ items, title: "dropdown 1", setItems: setItems, variant: "contained" }} />
                    <Dropdown
                        {...{
                            items: items_2,
                            setItems: setItems_2,
                            title: "dropdown 2",
                            variant: "outlined",
                        }}
                    />
                    <Dropdown
                        {...{
                            items: items_3,
                            setItems: setItems_3,
                            title: "dropdown 3",
                            variant: "text",
                            endIcon: edit,
                        }}
                    />
                    <Dropdown
                        {...{
                            items: apiItems,
                            setItems: setApiItems,
                            title: "api dropdown",
                            variant: "contained",
                            color: "secondary",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

// SELECT
const SelectSection = () => {
    const { edit } = localData.svgs;
    const { flag } = localData.images;

    const [items, setItems] = useState([
        { title: "item 1", isActive: false, id: uuidv4() },
        { title: "item 2", isActive: false, id: uuidv4() },
        { title: "item 3", isActive: false, id: uuidv4() },
    ]);
    const [items_2, setItems_2] = useState([
        { title: "item 1", isActive: false, id: uuidv4() },
        { title: "item 2", isActive: false, id: uuidv4() },
        { title: "item 3", isActive: false, id: uuidv4() },
    ]);
    const [items_3, setItems_3] = useState([
        { title: "item", endIcon: edit, isActive: false, id: uuidv4() },
        { title: "lorem ipsum dolor ", startIcon: edit, isActive: false, id: uuidv4() },
        { title: "america", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "mexico", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "argentina", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "canada", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "france", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "spain", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "united kingdom", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
    ]);

    // API
    const [apiItems, setApiItems] = useState([]);

    const filterItems = (data) => {
        let tempApiItems = [];
        tempApiItems = data.map(({ title, thumbnailUrl, id }, index) => {
            return { title, startIcon: <img src={thumbnailUrl} />, id };
        });
        setApiItems(tempApiItems);
    };

    const { getProducts } = useFetch();

    useEffect(() => {
        getProducts((err, data) => filterItems(data));
    }, []);
    //

    return (
        <section id="select">
            <div className="container">
                <h2 className="display-2">select</h2>
                <div className="select-group" style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
                    <Select {...{ items, setItems, placeholder: "select 1", variant: "contained" }} />
                    <Select
                        {...{
                            items: items_2,
                            placeholder: "select 2",
                            setItems: setItems_2,
                            variant: "outlined",
                        }}
                    />
                    <Select
                        {...{
                            items: items_3,
                            placeholder: "select 3",
                            setItems: setItems_3,
                            variant: "text",
                        }}
                    />
                    <Select
                        {...{
                            items: apiItems,
                            placeholder: "api select",
                            setItems: setApiItems,
                            variant: "contained",
                            color: "secondary",
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

// SELECT BADGE
const MultiSelectSection = () => {
    const { edit } = localData.svgs;
    const { flag } = localData.images;

    const [items, setItems] = useState([
        { title: "item 1", isSelected: false, id: uuidv4() },
        { title: "item 2", isSelected: false, id: uuidv4() },
        { title: "item 3", isSelected: false, id: uuidv4() },
        { title: "item 4", isSelected: false, id: uuidv4() },
        { title: "item 5", isSelected: false, id: uuidv4() },
        { title: "item 6", isSelected: false, id: uuidv4() },
    ]);
    const [items_2, setItems_2] = useState([
        { title: "item 1", isActive: false, id: uuidv4() },
        { title: "item 2", isActive: false, id: uuidv4() },
        { title: "item 3", isActive: false, id: uuidv4() },
    ]);
    const [items_3, setItems_3] = useState([
        { title: "item", endIcon: edit, isActive: false, id: uuidv4() },
        { title: "lorem ipsum dolor ", startIcon: edit, isActive: false, id: uuidv4() },
        { title: "america", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "mexico", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "argentina", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "canada", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "france", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "spain", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "united kingdom", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
    ]);

    // API
    const [apiItems, setApiItems] = useState([]);

    const filterItems = (data) => {
        let tempApiItems = [];
        tempApiItems = data.map(({ title, thumbnailUrl, id }, index) => {
            return { title, startIcon: <img src={thumbnailUrl} />, id };
        });
        setApiItems(tempApiItems);
    };

    const { getProducts } = useFetch();

    useEffect(() => {
        getProducts((err, data) => filterItems(data));
    }, []);
    //

    return (
        <section>
            <div className="container">
                <h2 className="display-2">select badge</h2>
                <div className="select-group" style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
                    <MultiSelect
                        {...{
                            items,
                            setItems,
                            variant: "outlined",
                            limitTags: 2,
                        }}
                    />
                    {/* <Select
                        {...{
                            items: items_2,
                            placeholder: "select 2",
                            setItems: setItems_2,
                            variant: "outlined",
                        }}
                    />
                    <Select
                        {...{
                            items: items_3,
                            placeholder: "select 3",
                            setItems: setItems_3,
                            variant: "text",
                        }}
                    />
                    <Select
                        {...{
                            items: apiItems,
                            placeholder: "api select",
                            setItems: setApiItems,
                            variant: "contained",
                            color: "secondary",
                        }}
                    /> */}
                </div>
            </div>
        </section>
    );
};

// AUTOCOMPLETE
const AutocompleteSection = () => {
    const { edit } = localData.svgs;
    const { flag } = localData.images;

    const [items, setItems] = useState([
        { title: "item 1", isActive: false, id: uuidv4() },
        { title: "item 2", isActive: false, id: uuidv4() },
        { title: "item 3", isActive: false, id: uuidv4() },
    ]);

    const [items_2, setItems_2] = useState([
        { title: "item 1", isActive: false, id: uuidv4() },
        { title: "item 2", isActive: false, id: uuidv4() },
        { title: "item 3", isActive: false, id: uuidv4() },
    ]);

    const [items_3, setItems_3] = useState([
        { title: "item", endIcon: edit, isActive: false, id: uuidv4() },
        { title: "lorem ipsum dolor ", startIcon: edit, isActive: false, id: uuidv4() },
        { title: "america", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "mexico", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "argentina", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "canada", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "france", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "spain", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
        { title: "united kingdom", endIcon: <img src={flag} />, isActive: false, id: uuidv4() },
    ]);

    // API
    const [apiItems, setApiItems] = useState([]);

    const filterItems = (data) => {
        let tempApiItems = [];
        tempApiItems = data.map(({ title, thumbnailUrl, id }, index) => {
            return { title, startIcon: <img src={thumbnailUrl} />, id };
        });
        setApiItems(tempApiItems);
    };

    const { getProducts } = useFetch();

    useEffect(() => {
        getProducts((err, data) => filterItems(data));
    }, []);
    //

    return (
        <section id="select">
            <div className="container">
                <h2 className="display-2">autocomplete</h2>
                <div className="select-group" style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
                    <Autocomplete
                        {...{ items, setItems, placeholder: "autocomplete 1", variant: "contained" }}
                    />
                    <Autocomplete
                        {...{
                            items: items_2,
                            setItems: setItems_2,
                            placeholder: "autocomplete 2",
                            variant: "outlined",
                        }}
                    />
                    <Autocomplete
                        {...{
                            items: items_3,
                            setItems: setItems_3,
                            placeholder: "autocomplete 3",
                            variant: "text",
                        }}
                    />
                    <Autocomplete
                        {...{
                            items: apiItems,
                            setItems: setApiItems,
                            placeholder: "api autocomplete",
                            variant: "contained",
                            color: "secondary",
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

// ACCORDION
const AccordionSection = () => {
    return (
        <section id="accordion">
            <div className="container">
                <h2 className="display-2">accordion</h2>
                <h3>uncontrolled</h3>
                <Accordion
                    active={0}
                    items={[
                        {
                            buttonName: "accordion item #1",
                            variant: "contained",
                            content: (
                                <>
                                    <strong>This is the first item's accordion body.</strong> It is shown by
                                    default, until the collapse plugin adds the appropriate classes that we
                                    use to style each element. These classes control the overall appearance,
                                    as well as the showing and hiding via CSS transitions. You can modify any
                                    of this with custom CSS or overriding our default variables. It's also
                                    worth noting that just about any
                                </>
                            ),
                        },
                        {
                            buttonName: "accordion item #2",
                            variant: "outlined",
                            content: (
                                <>
                                    <strong>This is the first item's accordion body.</strong> It is shown by
                                    default, until the collapse plugin adds the appropriate classes that we
                                    use to style each element. These classes control the overall appearance,
                                    as well as the showing and hiding via CSS transitions. You can modify any
                                    of this with custom CSS or overriding our default variables. It's also
                                    worth noting that just about any
                                </>
                            ),
                        },
                        {
                            buttonName: "accordion item #3",
                            content: (
                                <>
                                    <strong>This is the first item's accordion body.</strong> It is shown by
                                    default, until the collapse plugin adds the appropriate classes that we
                                    use to style each element. These classes control the overall appearance,
                                    as well as the showing and hiding via CSS transitions. You can modify any
                                    of this with custom CSS or overriding our default variables. It's also
                                    worth noting that just about any
                                </>
                            ),
                        },
                    ]}
                />

                <br />
                <br />
                <br />
                <br />

                <h3>controlled</h3>
                <ControlledAccordion
                    active={0}
                    items={[
                        {
                            buttonName: "accordion item #1",
                            variant: "contained",
                            content: (
                                <>
                                    <strong>This is the first item's accordion body.</strong> It is shown by
                                    default, until the collapse plugin adds the appropriate classes that we
                                    use to style each element. These classes control the overall appearance.
                                </>
                            ),
                        },
                        {
                            buttonName: "accordion item #2",
                            variant: "outlined",
                            content: (
                                <>
                                    <strong>This is the first item's accordion body.</strong> It is shown by
                                    default, until the collapse plugin adds the appropriate classes that we
                                    use to style each element. These classes control the overall appearance,
                                    as well as the showing and hiding via CSS transitions. You can modify any
                                    of this with custom CSS or overriding our default variables. It's also
                                    worth noting that just about any
                                    <p style={{ marginTop: "1rem", paddingBottom: "0.4rem" }}>
                                        jflsdjfkdsjfa a fdsf afas adsf
                                    </p>
                                    <Button variant="contained" name="button" />
                                </>
                            ),
                        },
                        {
                            buttonName: "accordion item #3",
                            content: (
                                <>
                                    <strong>This is the first item's accordion body.</strong> It is shown by
                                    default, until the collapse plugin adds the appropriate classes that we
                                    use to style each element. These classes control the overall appearance,
                                    as well as the showing and hiding via CSS transitions. You can modify any
                                    of this with custom CSS or overriding our default variables. It's also
                                    worth noting that just about any as well as the showing and hiding via CSS
                                    transitions. You can modify any of this with custom CSS or overriding our
                                    default variables. It's also worth noting that just about any
                                </>
                            ),
                        },
                    ]}
                />
            </div>
        </section>
    );
};

// MODAL
function ModalSection() {
    return (
        <section id="modal">
            <div className="container">
                <h2 className="display-2">modal</h2>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <Modal />
                    <Modal
                        title="centered modal"
                        buttonTitle="open centered modal"
                        className="modal-dialog-centered"
                    />
                    <Modal
                        title="full screen modal"
                        buttonTitle="open full screen modal"
                        className="modal-fullscreen"
                    />
                    <Modal title="modal with nested modal" buttonTitle="open modal with nested modal">
                        <NestedModal className="modal-dialog-centered" />
                    </Modal>
                    <Modal
                        title="modal with nested modal and callback"
                        className="modal-dialog-centered"
                        buttonTitle="open modal with nested modal and callback"
                        Child={NestedModal}
                    />
                </div>
            </div>
        </section>
    );
}

// DRAWER
const DrawerComponent = ({ callbackFromParent }) => {
    return (
        <>
            <p>drawer with Component</p>
            <br />

            <Button variant="contained" name="close drawer" onClick={callbackFromParent} />
            <br />
            <br />

            <p style={{ fontSize: "12px" }}>Components able to receive a callback from parent</p>
        </>
    );
};

function DrawerSection() {
    const { placeholder } = localData.images;
    const { bars } = localData.svgs;
    return (
        <section id="drawer">
            <div className="container">
                <h2 className="display-2">drawer</h2>
                <Drawer />
                <br />
                <br />

                <Drawer
                    toggler={<Button variant="circle" icon={bars} />}
                    content="drawer with icon toggler"
                />
                <br />
                <br />

                <Drawer toggler={<Button name="open drawer with children" variant="contained" />}>
                    <div className="drawer-body">drawer with children</div>
                </Drawer>
                <br />
                <br />

                <Drawer
                    toggler={<Button name="open drawer with Component" variant="contained" />}
                    Component={DrawerComponent}
                />
                <br />
                <br />

                <Drawer
                    toggler={
                        <Button color="dark" variant="text">
                            <div className="profile" style={{ cursor: "pointer" }}>
                                <div className="profile-image">
                                    <img
                                        src={placeholder}
                                        alt=""
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                </div>
                                <div className="profile-name">Open drawer with toggler component</div>
                            </div>
                        </Button>
                    }
                    content="drawer with toggler component (non button)"
                />
                <br />
                <br />

                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    <Drawer
                        toggler={<Button name="open left drawer" variant="contained" />}
                        className="drawer-left"
                        content="drawer left"
                    />
                    <Drawer
                        toggler={<Button name="open right drawer" variant="contained" />}
                        className="drawer-right"
                        content="drawer right"
                    />
                    <Drawer
                        toggler={<Button name="open top drawer" variant="contained" />}
                        className="drawer-top"
                        content="drawer top"
                    />
                    <Drawer
                        toggler={<Button name="open bottom drawer" variant="contained" />}
                        className="drawer-bottom"
                        content="drawer bottom"
                    />
                </div>
            </div>
        </section>
    );
}

// TABS

const tabs = [
    {
        title: "home",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        title: "profile",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        title: "contact",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
];
const tabs_2 = [
    {
        title: "home",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        title: "profile",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        title: "contact",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        title: "contact",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        title: "contact",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        title: "contact",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        title: "contact",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        title: "contact",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        title: "contact",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        title: "contact",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
];

function TabsSection() {
    return (
        <section id="tabs">
            <div className="container">
                <h2 className="display-2">tabs</h2>
                <Tabs tabs={tabs} />
                <Tabs tabs={tabs} defaultTab={1} />
                <Tabs tabs={tabs_2} swiper={true} />
            </div>
        </section>
    );
}

// TOASTIFY
function ReactToastifySection() {
    const notify = () => toast("Wow so easy!");
    // const notify = () => {
    //     toast("Default Notification !");

    //     toast.success("Success Notification !", {
    //         position: toast.POSITION.TOP_CENTER,
    //         // autoClose: false,
    //         autoClose: 7000,
    //         // icon: false,
    //         icon: "🚀",
    //         delay: 1000,
    //         // draggablePercent: 60,
    //         // type: toast.TYPE.INFO,
    //         // onOpen: () => window.alert('Called when I open'),
    //         // onClose: () => window.alert('Called when I close')
    //     });

    // };

    const successAlert = (message = "success") => {
        toast.success(message);
    };
    const errorAlert = (message = "error") => {
        toast.error(message);
    };
    return (
        <section id="react-toastify">
            <div className="container">
                <h2 className="display-2">react toastify</h2>
                <Button variant="contained" onClick={notify} name="  Notify!" />
                <br />
                <br />
                <br />
                <Button
                    variant="contained"
                    color="success"
                    name="success alert"
                    onClick={() => successAlert("success message")}
                />
                <br />
                <br />
                <Button
                    variant="contained"
                    color="danger"
                    name="error alert"
                    onClick={() => errorAlert("error message")}
                />

                <ToastContainer autoClose={3000} />
            </div>
        </section>
    );
}

export default function PopupPage() {
    const { pageFade } = useGlobalContext().animations;
    return (
        <>
            <Header title="popup" />
            <motion.main {...pageFade} className="modal-page">
                <DropdownSection />
                <SelectSection />
                <MultiSelectSection />
                <AutocompleteSection />
                <AccordionSection />
                <ModalSection />
                <DrawerSection />
                <TabsSection />
                <ReactToastifySection />
            </motion.main>
            <Footer />
        </>
    );
}
