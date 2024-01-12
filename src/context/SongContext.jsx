import {
    createContext,
    useContext,
    useReducer,
} from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
    const name = ""

    const reducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_NAME":
                return action.payload

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, name);

    return (
        <SongContext.Provider value={{ name: state, dispatch }}>
            {children}
        </SongContext.Provider>
    );
};