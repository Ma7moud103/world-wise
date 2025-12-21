import { createContext, useContext, useReducer } from "react";
import { signUpHelper } from "../data/Signup";
import { signInHelper } from "../data/Signin";

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    const initialState = {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        token: null
    };

    function reducer(state, action) {
        switch (action.type) {
            case "auth/loading":
                return { ...state, isLoading: true, error: null };
            case "auth/signin":
                return {
                    ...state,
                    user: action.payload.user,
                    isAuthenticated: true,
                    token: action.payload?.session?.access_token,
                    isLoading: false,
                    error: null
                };
            case "auth/signup":
                return {
                    ...state,
                    user: action.payload,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null
                };
            case "auth/signout":
                return {
                    ...state,
                    user: null,
                    isAuthenticated: false,
                    token: null,
                    isLoading: false,
                    error: null
                };
            case "auth/error":
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                };
            default:
                throw new Error("Unknown action type");
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    async function signin(email, password) {
        try {
            dispatch({ type: "auth/loading" });
            const res = await signInHelper(email, password);

            if (res && res.data) {
                dispatch({ type: "auth/signin", payload: res.data });
                return { success: true, data: res.data };
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            const errorMessage = error.message || "An error occurred during login";
            dispatch({ type: "auth/error", payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    }

    async function signup(email, password, phone) {
        try {
            dispatch({ type: "auth/loading" });
            const res = await signUpHelper(email, password, phone);

            if (res.data) {
                dispatch({ type: "auth/signup", payload: res.data });
                return { success: true, data: res.data };
            } else {
                throw new Error("Signup failed");
            }
        } catch (error) {
            const errorMessage = error.message || "An error occurred during signup";
            dispatch({ type: "auth/error", payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    }

    function signout() {
        dispatch({ type: "auth/signout" });
    }

    return (
        <AuthContext.Provider
            value={{
                ...state, 
                signin,
                signup,
                signout,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function AuthContextConsumer() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("AuthContextConsumer must be used within a AuthContextProvider");
    }
    return context;
}