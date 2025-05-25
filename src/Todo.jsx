import './Todo.css';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

export default function Todo() {
    let [todos, setTodos] = useState([]);
    let [newTodo, setNewTodo] = useState("");
    let addNewTask = () => {
        const trimmedTask = newTodo.trim();
        if (trimmedTask === "") {
            alert("Task cannot be empty!");
            return;
        }
        const isDuplicate = todos.some(todo => todo.task.toLowerCase() === trimmedTask.toLowerCase());
        if (isDuplicate) {
            alert("Task already exists!");
            return;
        }
        setTodos((prevTodos) => {
            return [...prevTodos, { task: trimmedTask, id: uuidv4() }];
        });
        setNewTodo("");
    };
    let updateTodo = (event) => {
        setNewTodo(event.target.value);
    };
    let removeTask = (id) => {
        setTodos(() => todos.filter((prevTodos) => prevTodos.id !== id));
    };
    let toggleComplete = (id) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
    return (
        <div className="Todo">
            <h1>To-Do App</h1>
            <div className='addTask'>
                <input placeholder="Enter Your Task" value={newTodo} onChange={updateTodo}/>
                <i className="fa-solid fa-circle-plus" onClick={addNewTask}></i>
            </div>
            <ul>{todos.map((todo) => (
                <li key={todo.id} className={todo.completed ? "completed" : ""}>
                    <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
                    &nbsp;&nbsp;
                    {todo.task}
                    <i className="fa-solid fa-xmark" onClick={() => removeTask(todo.id)}></i>
                </li>

            ))}
            </ul>
        </div>
    )
}