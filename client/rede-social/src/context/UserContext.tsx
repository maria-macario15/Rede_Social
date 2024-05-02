"use client";

import { createContext, useState } from "react";

interface ContextProps {
    children: React.ReactNode;
}


interface User {
    user: | {
        id: number;
        email: string;
        username: string;
        user_img: string;
        bg_img: string;
    }
    | undefined;
    setUser: (newState: any) => void;
};

const intialValue = {
    user: undefined,
    setUser: () => { },
};

export const UserContext = createContext<User>(intialValue)

export const UserContextProvider = ({ children }: ContextProps) => {
    let UserJSON = localStorage.getItem('rede-social:user');
    const [user, setUser] = useState(UserJSON ? JSON.parse(UserJSON) : intialValue.user
    )

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider>

    )


}
