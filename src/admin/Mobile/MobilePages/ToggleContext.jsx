// ToggleContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
    const [isToggle, setIsToggle] = useState(() => {
        const storedState = localStorage.getItem('Toggle');
        return storedState ? JSON.parse(storedState) : null;
    });

    useEffect(() => {
        localStorage.setItem('Toggle', JSON.stringify(isToggle));
    }, [isToggle]);

    return (
        <ToggleContext.Provider value={{ isToggle, setIsToggle }}>
            {children}
        </ToggleContext.Provider>
    );
};

export const useToggle = () => useContext(ToggleContext); 