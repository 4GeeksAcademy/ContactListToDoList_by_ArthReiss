import { createContext, useReducer } from "react";

const inicialState ={
    user: null,
    tasks: [],
    contacts: []
};

const globalReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                tasks: action.payload.tasks,
                contacts: action.payload.contacts
            }
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
        }
        case 'DELETE_TASK': 
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case 'DELETE_CONTACT': 
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        case 'EDIT_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact.id === action.payload.id ? action.payload : contact
                )
            }
            default:
                return state
    }
};

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [store, dispatch] = useReducer(globalReducer, inicialState);

    return (
        <GlobalContext.Provider value={{ store, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}