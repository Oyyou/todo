import { useState } from 'react'
import './App.css'

interface TodoItem {
  id: string;
  value: string;
  done: boolean;
}

function App() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  const handleOnAdd = () => {
    setTodoItems((prev) => ([
      ...prev, {
        id: crypto.randomUUID(),
        value: "",
        done: false,
      }
    ]))
  }

  const handleItemTextChange = (item: TodoItem, e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItems((prev) => prev.map((p) => ({
      ...p,
      value: item.id === p.id ? e.target.value : p.value,
    })));
  }

  const handleOnCheckClicked = (item: TodoItem) => {
    setTodoItems((prev) => prev.map((p) => ({
      ...p,
      done: item.id === p.id ? !p.done : p.done,
    })));
  }

  const handleRemoveItem = (id: string) => {
    setTodoItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Todo</h1>
        <button onClick={handleOnAdd}>+</button>
      </div>
      <ul className="todo-list">
        {todoItems.map((item) => (
          <li key={item.id} className={`todo-item ${item.done ? 'done' : ''}`}>
            <input
              value={item.value}
              onChange={(e) => handleItemTextChange(item, e)}
              placeholder="Enter task"
            />
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => handleOnCheckClicked(item)}
            />
            <button onClick={() => handleRemoveItem(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App
