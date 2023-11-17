import "./App.css";
import { useEffect, useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";

export default function App() {
  const [inputValue, setValue] = useState("");
  const [listOfTasks, setTask] = useState([]);
  const [editButton, setEditButton] = useState(false);
  const [addButton, steAddButton] = useState(true);
  const [editValue, setEditValue] = useState("");
  const [taskId, setTaskId] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
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
        todo: inputValue,
      })
      .then(({ data }) => {
        setTask(data);
      });
  }

  function showEditButton() {
    setEditButton(!editButton);
  }

  function showAddButton() {
    steAddButton(!addButton);
  }

  return (
    <div className="container">
      <h1>To-do List</h1>
      <div className="input">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(event) => setValue(event.target.value)}
        />
        {addButton && (
          <button
            onClick={() => {
              createTodo();
              setValue("");
              inputRef.current.focus();
            }}
          >
            <AiOutlinePlus style={{ color: "mediumvioletred" }} />
          </button>
        )}

        {editButton && (
          <button
            onClick={() => {
              updateTodo(taskId);
              setValue("");
              showEditButton();
              showAddButton();
            }}
          >
            <MdOutlineModeEdit style={{ fontSize: "18px", color: "#3AA655" }} />
          </button>
        )}
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
                    setTaskId(task._id);
                    showAddButton();
                    showEditButton();
                    inputRef.current.focus();
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
