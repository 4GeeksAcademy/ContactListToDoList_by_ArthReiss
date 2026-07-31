import React, { useState, useContext } from "react";
import { GlobalContext } from "../Services/GlobalContext";
import { logInContactList, logInToDoUser } from "../Services/ServicesAPI";
import "../Styles/Home.css";

const User = () => {
  const [user, setUser] = useState("");
  const { dispatch } = useContext(GlobalContext);

  const logInButton = async () => {
    try {
      const [userTasks, userContacts] = await Promise.all([
        logInToDoUser(user),
        logInContactList(user),
      ]);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: user,
          tasks: userTasks,
          contacts: userContacts,
        },
      });
    } catch (error) {
      console.error("Algo salió mal", error);
    }
  };

  return (
    <div className="row vh-100 d-flex justify-content-center align-items-center">
      <div className="col-auto card">
        <img
          className="imgCard m-auto my-3"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9oY7d-UTtQAGggxZQxAM3ONCMKrB9fNfXakambSkgJLLWx5T-dh2-xsw&s=10"
          alt="Title"
        />
        <div className="card-body">
          <h4 className="cardTitle text-center">Tu agenda Reactiva</h4>
          <p className="cardText text-center">¡Bienvenido, usuario!</p>
          <div className="input-group d-flex align-items-center">
            <label htmlFor="username" className="form-label m-1 fs-3">
              <i className="mx-2 fa-solid fa-user"></i>
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              required
              placeholder="Tu nombre"
              autoComplete="off"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && logInButton()}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button onClick={logInButton} className="btn btn-primary my-3">
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
