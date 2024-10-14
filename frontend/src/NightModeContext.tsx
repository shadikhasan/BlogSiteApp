// src/NightModeContext.tsx
import React, { createContext, useState, useEffect } from 'react';

interface NightModeContextType {
    isNightMode: boolean;
    toggleNightMode: () => void;
}

export const NightModeContext = createContext<NightModeContextType | undefined>(undefined);

export const NightModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isNightMode, setIsNightMode] = useState<boolean>(false);

    useEffect(() => {
        const storedMode = localStorage.getItem('nightMode');
        if (storedMode === 'true') {
            setIsNightMode(true);
        }
    }, []);

    const toggleNightMode = () => {
        setIsNightMode(prev => !prev);
        localStorage.setItem('nightMode', !isNightMode ? 'true' : 'false');
    };

    return (
        <NightModeContext.Provider value={{ isNightMode, toggleNightMode }}>
            {children}
        </NightModeContext.Provider>
    );
};
