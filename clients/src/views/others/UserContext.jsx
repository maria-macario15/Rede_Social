"use client";

import { createContext, useState } from "react";

const initialValue = {
    user: undefined,
    setUser: () => {},
};

export const UserContext = createContext(initialValue);

export const UserContextProvider = ({ children }) => {
    let UserJSON = localStorage.getItem('rede-social:user');
    const [user, setUser] = useState(UserJSON ? JSON.parse(UserJSON) : initialValue.user);

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    );
};
