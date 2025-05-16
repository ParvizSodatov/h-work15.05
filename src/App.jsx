import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Нон харандан', done: false },
    { id: 2, text: 'React-ро омӯзиш кардан', done: false },
     { id: 3, text: 'Ба Софтклаб рафтан', done: false },
  ]);
  
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const addTask = () => {
    if (input.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: input,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const openEditModal = (id, text) => {
    setEditId(id);
    setEditText(text);
    setShowModal(true);
  };

  const updateTask = () => {
    setTasks(tasks.map(task =>
      task.id === editId ? { ...task, text: editText } : task
    ));
    setShowModal(false);
    setEditId(null);
    setEditText('');
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.done;
    if (filter === 'completed') return task.done;
    return true;
  });

  return (
    <div className="todo-container">
      <h2>Руйхати корҳо</h2>

      <div className="controls">
        <input
          type="text"
          value={input}
          placeholder="Корро ворид кунед"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Илова кардан</button>

        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">Ҳама</option>
          <option value="active">Фаъол</option>
          <option value="completed">Иҷрошуда</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Омода</th>
            <th>Кор</th>
            <th>Амалиёт</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id} className={task.done ? 'done' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                />
              </td>
              <td>{task.text}</td>
              <td>
                <button onClick={() => openEditModal(task.id, task.text)}>
                  Тағйир додан
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  Нест кардан
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Тағйир додани кор</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={updateTask}>Сабт кардан</button>
              <button onClick={() => setShowModal(false)}>Бекор кардан</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
