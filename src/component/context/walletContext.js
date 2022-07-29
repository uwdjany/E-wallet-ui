import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import jwtDecode from "jwt-decode";

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
    const { user, token } = useContext(AuthContext);
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    const getBalance = async () => {
        const res = await fetch(`${window.API_URL}api/wallet/balance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.status === 200) {
            setBalance(data.data.balance);
        }
    };

    const transfer = async ({ receiverWalletRef, amount }) => {
        const { walletRef } = jwtDecode(token);

        const res = await fetch(`${window.API_URL}api/wallet/transfer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ senderWalletRef: walletRef, receiverWalletRef, amount })
        });

        const data = await res.json();
        if (res.status === 200) {
            setBalance(data.data.balance);
        }
        return data;
    };

    const data = {
        balance,
        transfer
    };

    useEffect(() => {
        if (!user) {
            toast.success('you are not logged in');
            navigate('/');
        } else {
            getBalance();
        }
    }, [user, navigate]);
    
    return (
        <WalletContext.Provider value={data}>
        {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;
