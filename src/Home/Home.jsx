import { useContext } from "react";
import "../Styles/Home.css";
import User from "../Components/User.jsx";
import Navtabs from "../Components/Navtabs.jsx";
import { GlobalContext } from "../Services/GlobalProvider.jsx";
import ToDoList from "../Components/ToDoList.jsx";
import ContactList from "../Components/ContactList.jsx";

function Home() {
  const { store } = useContext(GlobalContext);

  return (
    <div>
      {!store.user ? (
        <div className="row vh-100 d-flex justify-content-center align-items-center">
          <User />
        </div>
      ) : (
        <>
          <div className="row p-5 d-flex justify-content-center align-items-center">
            <div className="card primaryCard col-6 p-3">
              <Navtabs />
              <div className="tab-content">
                <ToDoList />
                <ContactList />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
