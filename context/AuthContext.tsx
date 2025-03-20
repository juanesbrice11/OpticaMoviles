import { LoginSchema, UserSchema } from "@/types/schemas";
import { createContext, useContext, useEffect, useState } from "react";
import { login, register, validateUser } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null; loading: boolean; };
    onRegister?: (data: UserSchema) => Promise<any>;
    onLogin?: (data: LoginSchema) => Promise<any>;
    onLogout?: () => void;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
        loading: boolean;
    }>({
        token: null,
        authenticated: null,
        loading: true,
    });

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem("@access_token");
                setAuthState({
                    token: token || null,
                    authenticated: !!token,
                    loading: false, 
                });
            } catch (error) {
                setAuthState({
                    token: null,
                    authenticated: false,
                    loading: false,
                });
            }
        };

        loadToken();
    }, []);

    const Register = async (data: UserSchema) => {
        try {
            return await register(data);
        } catch (error) {
            console.error('Error en el registro:', error);
            throw error;
        }
    };

    const Login = async (data: LoginSchema) => {
        try {
            const response = await login(data);
            setAuthState({ token: response.access_token, authenticated: true, loading: false });
            AsyncStorage.setItem("@access_token", response.access_token);
            router.replace("/(content)/(tabs)/home");
            return response
        } catch (error) {
            console.error('Error en el login:', error);
            throw error;
        }
    };

    const Logout = () => {
        setAuthState({ token: null, authenticated: false, loading: false });
        AsyncStorage.removeItem("@access_token");
        router.replace("/(auth)/login");
    }

    const value = {
        onRegister: Register,
        onLogin: Login,
        onLogout: Logout,
        authState
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



