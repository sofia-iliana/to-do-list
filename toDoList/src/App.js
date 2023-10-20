import "./App.css";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";

export default function App() {
  const [inputValue, setValue] = useState("");
  const [listOfTasks, setTask] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:2222/todo").then(({ data }) => {
      setTask(data);
    });
  }, []);

  function createTodo() {
    axios
      .post("http://localhost:2222/todo/create", { todo: inputValue })
      .then(({ data }) => {
        setTask(data);
      });
  }

  function deleteTodo(id) {
    axios.delete("http://localhost:2222/todo/delete/" + id).then(({ data }) => {
      setTask(data);
    });
  }

  function updateTodo(id) {
    axios
      .put("http://localhost:2222/todo/update/" + id, { todo: inputValue })
      .then(({ data }) => {
        setTask(data);
      });
  }

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
            createTodo();
            setValue("");
          }}
        >
          <AiOutlinePlus style={{ color: "mediumvioletred" }} />
        </button>
      </div>
      <div className="list">
        <ul>
          {listOfTasks.map((task) => {
            return (
              <li key={task._id}>
                <input type="checkbox" className="checkbox" />
                {task.todo}
                <button
                  className="delete"
                  onClick={() => {
                    deleteTodo(task._id);
                  }}
                >
                  <BsTrash3 style={{ color: "#803790", fontSize: "18px" }} />
                </button>
                <button
                  className="edit"
                  onClick={() => {
                    updateTodo(task._id);
                    setValue("");
                  }}
                >
                  <MdOutlineModeEdit
                    style={{ fontSize: "18px", color: "#3AA655" }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
