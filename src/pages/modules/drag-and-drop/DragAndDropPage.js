import React, { useState, useRef } from "react";
import { motion, Reorder } from "framer-motion";
import { useGlobalContext } from "../../../context";
import { Header,Footer } from "../../../components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

// FRAMER MOTION REORDER
function ReorderItem({ item, onRemove }) {
    return (
        <Reorder.Item
            className="reorder-item"
            value={item}
            whileDrag={{ scale: 1.03, boxShadow: " 3px 3px 5px rgba(0,0,0,0.3)", zIndex: 1, position: "relative" }}
        >
            {item.name}
            <div className="close" onClick={() => onRemove(item.id)}>
                x
            </div>
        </Reorder.Item>
    );
}

function ReorderSection() {
    const [items, setItems] = useState([
        { id: 1, name: "one" },
        { id: 2, name: "two" },
        { id: 3, name: "three" },
        { id: 4, name: "four" },
        { id: 5, name: "five" },
    ]);

    const handleRemove = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };
    return (
        <section className="reorder">
            <div className="container">
                <h2 className="display-2">Framer Motion Reorder</h2>
                <Reorder.Group axis="y" as="ul" values={items} onReorder={setItems} className="reorder-list">
                    {items.map((item) => (
                        <ReorderItem key={item.id} item={item} onRemove={handleRemove} />
                    ))}
                </Reorder.Group>
            </div>
        </section>
    );
}

// REACT-BEAUTIFUL-DND               // disable strict mode from index.js in order DND to work
function DNDItem({ id, name, index, onRemove }) {
    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
                <li
                    className="dnd-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {name}{" "}
                    <div className="close" onClick={() => onRemove(id)}>
                        x
                    </div>
                </li>
            )}
        </Draggable>
    );
}
function DNDSection() {
    const [items, setItems] = useState([
        { id: "1", name: "one" },
        { id: "2", name: "two" },
        { id: "3", name: "three" },
        { id: "4", name: "four" },
        { id: "5", name: "five" },
    ]);

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const tempItems = Array.from(items);
        const [reorderedItem] = tempItems.splice(result.source.index, 1);
        tempItems.splice(result.destination.index, 0, reorderedItem);

        setItems(tempItems);
    }

    const handleRemove = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <section className="dnd">
            <div className="container">
                <h2 className="display-2">React-beautiful-dnd Reorder</h2>
                <div className="wrapper">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="items">
                            {(provided) => (
                                <ul className="dnd-list" {...provided.droppableProps} ref={provided.innerRef}>
                                    {items.map((item, index) => (
                                        <DNDItem key={item.id} index={index} {...item} onRemove={handleRemove} />
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </section>
    );
}

// REACT-BEAUTIFUL-DND KANBAN              // disable strict mode from index.js in order DND to work
const itemsFromBackend = [
    { id: uuidv4(), content: "First task" },
    { id: uuidv4(), content: "Second task" },
    { id: uuidv4(), content: "Third task" },
    { id: uuidv4(), content: "Fourth task" },
    { id: uuidv4(), content: "Fifth task" },
];

const columnsFromBackend = {
    [uuidv4()]: {
        name: "Requested",
        items: itemsFromBackend,
    },
    [uuidv4()]: {
        name: "To do",
        items: [],
    },
    [uuidv4()]: {
        name: "In Progress",
        items: [],
    },
    [uuidv4()]: {
        name: "Done",
        items: [],
    },
};

function DNDKanbanItem({ id, content, index, columnId, handleRemove }) {
    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided, snapshot) => (
                <li
                    className="board-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        // opacity: snapshot.isDragging ? "0.5" : "1",
                    }}
                >
                    {content}{" "}
                    <div className="close" onClick={() => handleRemove(id, columnId)}>
                        x
                    </div>
                </li>
            )}
        </Draggable>
    );
}

function DNDKanbanSection() {
    const [columns, setColumns] = useState(columnsFromBackend);

    const  handleOnDragEnd =(result)=> {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    }

    const handleRemove = (id, parentId) => {
        const tempColumns = { ...columns };
        const column = { ...tempColumns[parentId] };
        const items = column.items.filter((item) => item.id !== id);
        column.items = items;
        tempColumns[parentId] = column;
        setColumns({ ...tempColumns });
    };

    return (
        <section className="kanban">
            <div className="container">
                <h2 className="display-2">React-beautiful-dnd Kanban</h2>
                <div className="wrapper">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        {Object.entries(columns).map(([columnId, column]) => (
                            <Droppable key={columnId} droppableId={columnId}>
                                {(provided) => (
                                    <div className="board">
                                        <h4 className="board-title">{column.name}</h4>
                                        <ul className="board-list" {...provided.droppableProps} ref={provided.innerRef}>
                                            {column.items.map((item, index) => (
                                                <DNDKanbanItem
                                                    key={item.id}
                                                    {...{ ...item, handleRemove, columnId, index }}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </ul>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
                </div>
            </div>
        </section>
    );
}

export default function DragAndDropPage() {
    const { pageFade } = useGlobalContext().animations;

    return (
        <>
            <Header title="drag and drop" />
            <motion.main {...pageFade} className="drag-and-drop-page">
                <ReorderSection />
                <DNDSection />
                <DNDKanbanSection />
            </motion.main>
            <Footer/>
        </>
    );
}
