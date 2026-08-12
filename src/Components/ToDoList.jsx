import { useContext, useState } from "react";
import "../Styles/Home.css";
import { GlobalContext } from "../Services/GlobalProvider.jsx";
import { addTask, deleteTask } from "../Services/ServicesAPI.jsx";

const ToDoList = () => {
  const { store, dispatch } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");

  const addTaskButton = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "")
      return alert("¡No puedes crear tareas vacias!");
    const newTask = await addTask(store.user, inputValue);
    if (newTask) {
      dispatch({
        type: "ADD_TASK",
        payload: newTask,
      });
      setInputValue("");
    }
  };

  const handleDeleteTask = async (taskId) => {
    const isDeleted = await deleteTask(taskId);
    if (isDeleted) {
      dispatch({
        type: "DELETE_TASK",
        payload: taskId,
      });
    }
  };
  return (
    <div
      className="tab-pane"
      id="profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      <div className="col-auto p-4">
        <div className="row px-">
          <h4 className="col-auto">
            <i className="fa-solid fa-address-book"></i> Tus tareas
          </h4>
          <form className="d-flex my-2 my-3" onSubmit={addTaskButton}>
            <label className="mx-3 fs-3" htmlFor="task-bar">
              <i className="fa-solid fa-check"></i>
            </label>
            <input
              name="task-bar"
              autoComplete="off"
              id="task-bar"
              className="form-control me-sm-2"
              type="text"
              placeholder="Nueva tarea"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">
              Agregar
            </button>
          </form>
          <ul className="list my-3">
            {store.tasks.map((task) => (
              <li key={task.id} className="row fs-4 justify-content-between">
                <div className="col-8 d-flex align-items-center">
                  {task.label}
                </div>
                <div className="fs-5 text-secondary d-flex col-4 align-items-center justify-content-end">
                  <i
                    type="button"
                    className="fs-3 px-2 text-success fa-regular fa-square-check"
                    onClick={() => handleDeleteTask(task.id)}
                  ></i>
                </div>
                <hr className="text-secondary my-2" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
