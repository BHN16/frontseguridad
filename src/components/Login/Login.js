import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import './Login.css';

const LOGIN_URL='/login';

function Login() {
    
    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, []); // Se le pasa un arreglo para que solo lo ejecute al actualizar la página

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const hashPassword = (p) => {
        var crypto = require('crypto-js');
        return crypto.SHA256(p).toString();
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Para prevenir recaargar la pagina
        try { // nombreEnBD: nombreState
            const pp = await hashPassword(pwd);
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({
                    username: user,
                    password: pp
                }), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                console.log(JSON.stringify(response?.data));
                setAuth({user, pwd}); // Guardar valores necesarios que nos devuelva el backend
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className='container'>
            <p ref={ errRef } className={ errMsg ? 'errmsg' : 'offscreen' } aria-live='assertive'>{ errMsg }</p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                    type='text' 
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required />
                <label htmlFor='password'>Password:</label>
                <input 
                    type='password' 
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required />
                <button>Login</button>
            </form>
            <p>
                Need an account?<br />
                <span className='line'>
                    <a href='#'>Register</a>
                </span>
            </p>
        </div>
    )
}

export default Login;