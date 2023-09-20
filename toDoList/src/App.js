import "./App.css";
import { useState } from "react";
import "./App.css";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";

let nextId = 0;

export default function App() {
  const [inputValue, setValue] = useState("");
  const [listOfTasks, setTask] = useState([]);

  return (
    <div className="container">
      <h1>To-do List</h1>
      <div className="input">
        <input
          value={inputValue}
          onChange={(event) => setValue(event.target.value)}
        />
        <button
          onClick={() => {
            setTask([...listOfTasks, { id: nextId++, t: inputValue }]);
            setValue("");
          }}
        >
          <AiOutlinePlus style={{ color: "mediumvioletred" }} />
        </button>
      </div>
      <div className="list">
        <ul>
          {listOfTasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" className="checkbox" />
              {task.t}
              <button
                className="delete"
                onClick={() => {
                  setTask(listOfTasks.filter((e) => e.id !== task.id));
                }}
              >
                <BsTrash3 style={{ color: "#803790", fontSize: "18px" }} />
              </button>
              <button
                className="edit"
                onClick={() => {
                  setTask(
                    listOfTasks.map((e) => {
                      if (e.id === task.id) {
                        e.t = inputValue;
                        return e;
                      } else {
                        return e;
                      }
                    })
                  );
                  setValue("");
                }}
              >
                <MdOutlineModeEdit
                  style={{ fontSize: "18px", color: "#3AA655" }}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
