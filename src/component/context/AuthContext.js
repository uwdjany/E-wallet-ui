import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (data) => {
        const res = await fetch(`${window.API_URL}api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        if (res.status === 200) {
            setUser(json.data);
            setToken(json.data.token);
            localStorage.setItem('auth', JSON.stringify(json.data));
        }
        return json;
    };

    const signup = async (data) => {
        const res = await fetch(`${window.API_URL}api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        return json;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('auth');
    };


    const onLoad = () => {
        const localData = localStorage.getItem('auth');
        if (localData) {
            const data = JSON.parse(localData);
            setUser(data);
            setToken(data.token);
        }
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const data = {
        user,
        token,
        login,
        signup,
        logout
    };

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <AuthContext.Provider value={data}>
            {loading ? <></> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
