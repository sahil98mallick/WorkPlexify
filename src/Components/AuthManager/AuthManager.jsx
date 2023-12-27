import React, { createContext, useContext, useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';

const AuthContext = createContext();
const decryptData = (encryptedData, secretKey) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
    }
};
const AuthManager = ({ children }) => {
    const secretKey = 'sahilworkplexify';
    const [auth, setauth] = useState({
        user: null,
        token: ""
    })
    useEffect(() => {
        const encryptedData = localStorage.getItem('authenticate');
        if (encryptedData) {
            const decryptedData = decryptData(encryptedData, secretKey);

            if (decryptedData) {
                setauth({
                    user: decryptedData.user,
                    token: decryptedData.token
                });
            }
        }
    }, [secretKey]);

    // useEffect(() => {
    //     const response = localStorage.getItem("auth");
    //     const logindata = JSON.parse(response);
    //     if (logindata) {
    //         setauth({
    //             ...auth,
    //             user: logindata.user,
    //             token: logindata.token
    //         })
    //     }
    // }, [])
    return (
        <AuthContext.Provider value={[auth, setauth]}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthManager }
