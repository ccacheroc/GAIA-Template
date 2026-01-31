import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authApi } from '../api/authApi';
import { LoginInput } from '../schemas/authSchema';

// [Feature: User Authentication] [Story: AUTH-TEACHER-002] [Ticket: AUTH-TEACHER-002-FE-T02]

interface User {
    id: string;
    email: string;
    exp: number;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (data: LoginInput) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode<User>(token);
                    // Check expiration
                    if (decoded.exp * 1000 < Date.now()) {
                        logout();
                    } else {
                        setUser(decoded);
                    }
                } catch (error) {
                    logout();
                }
            }
        } catch (e) {
            console.error('LocalStorage access blocked', e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = async (data: LoginInput) => {
        const response = await authApi.login(data);
        const { access_token } = response;
        localStorage.setItem('token', access_token);
        const decoded = jwtDecode<User>(access_token);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
