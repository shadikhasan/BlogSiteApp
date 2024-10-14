// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CategoryProvider } from './CategoryContext';
import { NightModeProvider } from './NightModeContext'; // Import the Night Mode Context

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <NightModeProvider> {/* Wrap with Night Mode Provider */}
            <CategoryProvider>
                <App />
            </CategoryProvider>
        </NightModeProvider>
    </React.StrictMode>
);
