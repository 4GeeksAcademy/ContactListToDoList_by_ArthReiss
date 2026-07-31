const contactListURL = "https://playground.4geeks.com/contact/agendas";
const todoListURL = "https://playground.4geeks.com/todo";

// Inicio de sesión en el todo list
export const logInToDoUser = async (userName) => {
  try {
    const response = await fetch(`${todoListURL}/users/${userName}`);

    if (response.status === 404) {
      const createUser = await fetch(`${todoListURL}/users/${userName}`, {
        method: "POST",
      });
      if (createUser.ok) return [];
    }
    if (response.ok) {
      const data = await response.json();
      return data.todos || [];
    }
  } catch (error) {
    console.error("Algo salió mal", error);
    return [];
  }
};

// Inicio de sesión en el contactList
export const logInContactList = async (userName) => {
  try {
    const response = await fetch(`${contactListURL}/${userName}`);

    if (response.status === 404) {
      const createUser = await fetch(`${contactListURL}/${userName}`, {
        method: "POST",
      });
      if (createUser.ok) return [];
    }
    if (response.ok) {
      const data = await response.json();
      return data.contacts || [];
    }
  } catch (error) {
    console.error("Algo salió mal", error);
    return [];
  }
};

// Agregar tarea
export const addTask = async (userName, taskLabel) => {
  try {
    const response = await fetch(`${todoListURL}/todos/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: taskLabel,
        is_done: false,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("No se pudo crear la tarea");
    }
  } catch (error) {
    console.error("Algo salió mal :(", error);
    return null;
  }
};

// Crear o editar contacto
export const addContact = async (userName, contactData) => {
  try {
    const response = await fetch(`${contactListURL}/${userName}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("No se ha podido crear el contacto");
    }
  } catch (error) {
    console.error("Algo salió mal", error);
  }
};

// Eliminar tarea
export const deleteTask = async (userName, taskId) => {
  try {
    const response = await fetch(`${todoListURL}/todos/${userName}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      console.log("No se pudo eliminar la tarea");
      return false;
    }
  } catch (error) {
    console.error("Algo salió mal", error);
  }
};

// Eliminar contacto
export const deleteContact = async (userName, contactId) => {
  try {
    const response = await fetch(
      `${contactListURL}/${userName}/contacts/${contactId}`,
      {
        method: "DELETE",
      },
    );
    if (response.ok) {
      return true;
    } else {
      console.log("No se pudo eliminar el contacto");
      return false;
    }
  } catch (error) {
    console.error("Algo salió mal", error);
  }
};

// Editar contacto
export const editContact = async (userName, contactId, contactData) => {
  try {
    const response = await fetch(`${contactListURL}/${userName}/contacts/${contactId}`, {
      method: 'PUT', 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("No se pudo editar el contacto");
      return null;
    }
  } catch (error) {
    console.error("Algo salió mal", error);
    return null;
  }
}