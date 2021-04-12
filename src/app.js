import React, { useState, useEffect, useRef } from "react";
import Todolist from "./Todolist";
import { uuid } from "uuidv4";

const LOCAL_STORAGE_KEY = "todoApp.todos";

export function App() {
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedTodos) setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    function handleAddTodo() {
        const name = todoNameRef.current.value;
        if (name === "") return;
        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuid(), name: name, completed: false }];
        });
        todoNameRef.current.value = null;
    }

    function toggleTodo(id) {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    function handleClearComplete() {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    return (
        <>
            <Todolist todos={todos} toggleTodo={toggleTodo} />
            <br />
            <input type={Text} ref={todoNameRef} />
            <button onClick={handleAddTodo}>Add to To-Do</button>
            <br />
            <br />
            <button onClick={handleClearComplete}>Clear Completed</button>
            <h2>{todos.filter((todo) => !todo.completed).length} left to do</h2>
        </>
    );
}
