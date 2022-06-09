import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
    console.log("entra a use auth");
    return useContext(AuthContext);
}

export default useAuth;