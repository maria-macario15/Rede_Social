import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userJSON = localStorage.getItem('rede-social:user');
            if (userJSON) {
                setUser(JSON.parse(userJSON));
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
