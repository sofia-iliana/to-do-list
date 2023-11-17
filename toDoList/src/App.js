import "./App.css";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";

export default function App() {
  const [inputValue, setValue] = useState("");
  const [listOfTasks, setTask] = useState([]);
  const [editInput, setEditInput] = useState(false);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    axios.get("https://to-do-crud.onrender.com/todo").then(({ data }) => {
      setTask(data);
    });
  }, []);

  function createTodo() {
    axios
      .post("https://to-do-crud.onrender.com/todo/create", { todo: inputValue })
      .then(({ data }) => {
        setTask(data);
      });
  }

  function deleteTodo(id) {
    axios
      .delete("https://to-do-crud.onrender.com/todo/delete/" + id)
      .then(({ data }) => {
        setTask(data);
      });
  }

  function updateTodo(id) {
    axios
      .put("https://to-do-crud.onrender.com/todo/update/" + id, {
        todo: editValue,
      })
      .then(({ data }) => {
        setTask(data);
      });
  }

  function showEditInput() {
    setEditInput(!editInput);
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
                    showEditInput();
                  }}
                >
                  <MdOutlineModeEdit
                    style={{ fontSize: "18px", color: "#3AA655" }}
                  />
                </button>
                {editInput && (
                  <div>
                    <input
                      value={editValue}
                      onChange={(event) => setEditValue(event.target.value)}
                    />
                    <button
                      onClick={() => {
                        updateTodo(task._id);
                        setEditValue("");
                        showEditInput();
                      }}
                    >
                      <AiOutlinePlus style={{ color: "mediumvioletred" }} />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
