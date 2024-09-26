import React, { useState } from 'react';

const ToDo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [editTaskValue, setEditTaskValue] = useState("");

    function handleInput(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(tasks => [...tasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function editTask(index) {
        setIsEditing(true);
        setCurrentTaskIndex(index);
        setEditTaskValue(tasks[index]);
    }

    function handleEditInput(event) {
        setEditTaskValue(event.target.value);
    }

    function saveTask() {
        const updatedTasks = [...tasks];
        updatedTasks[currentTaskIndex] = editTaskValue;
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
        setEditTaskValue("");
    }

    return (
        <div className="container">
            <div className="input-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Add a new task" 
                    value={newTask} 
                    onChange={handleInput} 
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {isEditing && currentTaskIndex === index ? (
                            <div>
                                <input 
                                    type="text" 
                                    value={editTaskValue} 
                                    onChange={handleEditInput} 
                                />
                                <button onClick={saveTask}>✔️</button>
                            </div>
                        ) : (
                            <span>{task}</span>
                        )}
                        <div>
                            <button onClick={() => deleteTask(index)}><i class="bi bi-trash3-fill"></i></button>
                            <button onClick={() => moveUp(index)}><i class="bi bi-arrow-up"></i></button>
                            <button onClick={() => moveDown(index)}><i class="bi bi-arrow-down"></i></button>
                            {!isEditing && <button onClick={() => editTask(index)}><i class="bi bi-pen"></i></button>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDo;
