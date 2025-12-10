'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type SidebarContextType = {
    isMenuOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
    toggleMenu: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (window.innerWidth >= 768) {
            setIsMenuOpen(true);
        } else {
            setIsMenuOpen(false);
        }
    }, []);

    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <SidebarContext.Provider
            value={{ isMenuOpen, openMenu, closeMenu, toggleMenu }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}
