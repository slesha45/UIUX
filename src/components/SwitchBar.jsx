import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    if (user && user !== 'undefined') {
        try {
            return JSON.parse(user);
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
        }
    }
    return null;
}
const SwitchBar = () => {
    const [user, setUser] = useState(getUserFromLocalStorage());

    useEffect(() => {
        const handleStorageChange = () => {
            setUser(getUserFromLocalStorage());
        }

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, [])
    
    return user && user.isAdmin ? <Sidebar/> : <Navbar/>;
}

export default SwitchBar;
