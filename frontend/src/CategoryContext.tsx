// src/CategoryContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface CategoryContextType {
    selectedCategoryId: number | null;
    selectedCategoryName: string | null;
    setSelectedCategoryId: (id: number | null) => void;
    setSelectedCategoryName: (name: string | null) => void;
}

export const CategoryContext = createContext<CategoryContextType | null>(null);

interface CategoryProviderProps {
    children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

    return (
        <CategoryContext.Provider value={{ 
            selectedCategoryId, 
            setSelectedCategoryId, 
            selectedCategoryName, 
            setSelectedCategoryName 
        }}>
            {children}
        </CategoryContext.Provider>
    );
};
