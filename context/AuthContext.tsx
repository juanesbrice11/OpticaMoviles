import { LoginSchema, UserSchema } from "@/types/schemas";
import { createContext, useContext, useEffect, useState } from "react";
import { login, register, validateUser } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { router } from "expo-router";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { deactiveDeviceToken, registerDeviceToken } from "@/services/notificationService";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null; loading: boolean; role: string | null };
    onRegister?: (data: UserSchema) => Promise<any>;
    onLogin?: (data: LoginSchema) => Promise<any>;
    onLogout?: () => void;
    token?: string | null;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
        loading: boolean;
        role: string | null;
    }>({
        token: null,
        authenticated: null,
        loading: true,
        role: null
    });
    const { expoPushToken } = usePushNotifications();

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem("@access_token");
                if (token) {
                    const decoded: any = jwtDecode(token);
                    setAuthState({
                        token,
                        authenticated: true,
                        loading: false,
                        role: decoded.role || null,
                    });
                } else {
                    setAuthState({
                        token: null,
                        authenticated: false,
                        loading: false,
                        role: null,
                    });
                }
            } catch (error) {
                setAuthState({
                    token: null,
                    authenticated: false,
                    loading: false,
                    role: null,
                });
            }
        };

        loadToken();
    }, []);

    const Register = async (data: UserSchema) => {
        try {
            return await register(data);
        } catch (error) {
            console.error("Error en el registro:", error);
            throw error;
        }
    };

    const Login = async (data: LoginSchema) => {
        try {
            const response = await login(data);
            const decoded: any = jwtDecode(response.access_token);
            setAuthState({ 
                token: response.access_token, 
                authenticated: true, 
                loading: false,
                role: decoded.role || null 
            });
            await AsyncStorage.setItem("@access_token", response.access_token);
            await registerDeviceToken({ expoPushToken: expoPushToken }, response.access_token);
            router.replace("/(content)/(tabs)/home");
            return response;
        } catch (error) {
            console.error("Error en el login:", error);
            throw error;
        }
    };

    const Logout = async () => {
        try {
            const token = await AsyncStorage.getItem("@access_token");  
            if (token) {
                await deactiveDeviceToken({ expoPushToken: expoPushToken }, token);
            }
            await AsyncStorage.clear();
            setAuthState({ token: null, authenticated: false, loading: false, role: null });
            router.replace("/(auth)/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const value = {
        onRegister: Register,
        onLogin: Login,
        onLogout: Logout,
        authState,
        token: authState.token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
