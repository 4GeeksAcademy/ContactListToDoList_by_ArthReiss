import React from "react";
import { useContext, useState } from "react";
import "../Styles/Home.css";
import { GlobalContext } from "../Services/GlobalContext.jsx";
import {
  addContact,
  deleteContact,
  editContact,
} from "../Services/ServicesAPI.jsx";

const ContactList = () => {
  const { store, dispatch } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const handleDeleteContact = async (contactId) => {
    const isDeleted = await deleteContact(store.user, contactId);
    if (isDeleted) {
      dispatch({
        type: "DELETE_CONTACT",
        payload: contactId,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenNew = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
    setEditing(null);
  };

  const handleOpenEdit = (contact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
    });
    setEditing(contact.id);
  };

  const saveContactButton = async () => {
    if (formData.name.trim() === "")
      return alert("Necesitas guardar al menos un nombre");
    if (editing) {
      const updatedContact = await editContact(store.user, editing, formData);
      if (updatedContact) {
        dispatch({
          type: "EDIT_CONTACT",
          payload: updatedContact,
        });
      }
    } else {
      const newContact = await addContact(store.user, formData);
      if (newContact) {
        dispatch({
          type: "ADD_CONTACT",
          payload: newContact,
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
        });
      }
    }
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
    setEditing(null);
  };

  const searchContacts = store.contacts.filter(
    (contact) =>
      contact.name && contact.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="tab-pane active"
      id="home"
      role="tabpanel"
      aria-labelledby="home-tab"
    >
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <h4 className="col-auto">
            <i className="fa-solid fa-address-book"></i> Tus contactos
          </h4>
          <h4
            className="col-auto"
            type="button"
            onClick={handleOpenNew}
            data-bs-toggle="modal"
            data-bs-target="#newContact"
          >
            <i className="fa-solid fa-plus"></i>
          </h4>

          <form
            className="d-flex my-2 my-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-sm-2"
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {store.contacts.length === 0 ? (
            <div className="row d-flex justify-content-center">
              <h1 className="text-center text-secondary">
                ¡Que vacio esta esto!
              </h1>
              <h1
                className="text-center text-secondary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#newContact"
                onClick={handleOpenNew}
              >
                <i className="fa-solid fa-plus"></i>
              </h1>
              <h3 className="text-center text-secondary">Agregar contacto</h3>
            </div>
          ) : searchContacts.length === 0 ? (
            <div className="row d-flex justify-content-center p-5">
              <img
                className="imgCard"
                alt=""
                src="https://static.vecteezy.com/system/resources/previews/014/905/321/non_2x/magnifying-glass-with-cross-mark-search-no-result-found-concept-illustration-flat-design-eps10-minimalist-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg"
              />
            </div>
          ) : (
            <ul className="list list-unstyled my-3">
              {searchContacts.map((c) => (
                <li key={c.id} className="row fs-4 justify-content-between">
                  <div className="col-10 d-flex align-items-center">
                    <h5
                      className=""
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#modal-${c.id}`}
                    >
                      <img
                        className="contactIcon m-2"
                        src={c.address}
                        alt={c.name}
                      />
                      {c.name}
                    </h5>
                  </div>
                  <hr className="text-secondary" />
                  {/* modal para ver contacto  */}
                  <div
                    className="modal fade"
                    id={`modal-${c.id}`}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="modalTitleId"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="modalTitleId">
                            Contacto
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="d-flex flex-column align-items-center mt-3">
                          <h4 className="card-title">{c.name}</h4>
                          <img className="imgCard m-3" alt="" src={c.address} />
                        </div>
                        <div className="row mx-2 my-4">
                          <label htmlFor="phone">Teléfono: </label>
                          <h4 name="phone" className="card-text">
                            {c.phone}
                          </h4>
                          <label htmlFor="email">E-mail:</label>
                          <h4 name="email" className="card-text">
                            {c.email}
                          </h4>
                        </div>
                        <div className="row d-flex text-center mb-3">
                          <hr className="text-secondary" />
                          <h5
                            type="button"
                            className="mb-3"
                            onClick={() => handleOpenEdit(c)}
                            data-bs-toggle="modal"
                            data-bs-target="#newContact"
                          >
                            Editar
                          </h5>
                          <hr className="text-secondary" />
                          <h5
                            type="button"
                            data-bs-dismiss="modal"
                            onClick={() => handleDeleteContact(c.id)}
                            className="text-danger"
                          >
                            Eliminar
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* modal para crear y editar contacto  */}
          <div
            className="modal fade"
            id="newContact"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
              role="document"
            >
              <div className="modal-content">
                <div className="row d-flex justify-content-between">
                  <h4 className="col-6 text-center mt-3" id="modalTitleId">
                    <i className="fa-solid fa-address-book"></i>
                    {` `}
                    {editing ? "Editar contacto" : "Crear contacto"}
                  </h4>
                  <button
                    type="button"
                    className="col-4 btn-close m-4 "
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-header flex-column">
                  <img
                    className="imgCard"
                    alt="Foto de perfil"
                    src={
                      formData.address && formData.address.trim() !== ""
                        ? `${formData.address}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9oY7d-UTtQAGggxZQxAM3ONCMKrB9fNfXakambSkgJLLWx5T-dh2-xsw&s=10"
                    }
                  />
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="off"
                      name="name"
                      required
                      id="name"
                      placeholder="Nombre"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      name="phone"
                      autoComplete="off"
                      id="phone"
                      placeholder="Teléfono"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="E-mail"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.address}
                      onChange={handleChange}
                      autoComplete="off"
                      name="address"
                      id="address"
                      placeholder="Link de foto de perfil"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={saveContactButton}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
