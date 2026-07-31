import React from "react";
import { useContext } from "react";
import "../Styles/Home.css";
import { GlobalContext } from "../Services/GlobalContext.jsx";

const Navtabs = ({ user }) => {
  const { store } = useContext(GlobalContext);

  return (
    <div>
      <h4 className="card-title text-center mb-3">Agenda de {store.user}</h4>
      <ul
        className="nav nav-tabs justify-content-center"
        id="tabs-agenda"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="contacts-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Contactos
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="todo-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Tareas
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navtabs;
