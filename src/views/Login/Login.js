import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { hashPassword } from '../../utils/Encription';
import './Login.css';

const LOGIN_URL='http://137.184.83.170:5000/login';

function Login() {

    let navigate = useNavigate();
    
    const { auth, setAuth } = useAuth();

    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');


    useEffect(() => {
        userRef.current.focus();
    }, []); // Se le pasa un arreglo para que solo lo ejecute al actualizar la página

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    useEffect(() => {
        if (success) {
            return navigate('/home/main');
        }
    },[success])

    const handleSubmit = async (e) => {
        e.preventDefault(); // Para prevenir recaargar la pagina
        const hashedPassword = await hashPassword(pwd);
        const sendUser = user;
        console.log(user, hashPassword);
        try { // nombreEnBD: nombreState
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({
                    email: sendUser,
                    password: hashedPassword
                }),
                {
                    headers: { 'Content-Type': 'application/json' }
                });
                console.log(auth);
                console.log(JSON.stringify(response?.data));
                const user = response?.data?.username;
                const msg = response?.data?.msg;
                setAuth({ user, email:msg }); // Guardar valores necesarios que nos devuelva el backend
                window.localStorage.setItem('user-session', JSON.stringify(response));
                console.log(hashedPassword);
                setSuccess(true);
        } catch (err) {
            console.log(hashedPassword);
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
        <div className='container-login-container'>
            <div className='login-container'>
                <p ref={ errRef } className={ errMsg ? 'errmsg' : 'offscreen' } aria-live='assertive'>{ errMsg }</p>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className='login-form'>
                    <label htmlFor='username'>Email:</label>
                    <input 
                        type='text' 
                        id='username'
                        className='username-input-container'
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
                    <button className='login-button'>Login</button>
                </form>
                <p>
                    Need an account?<br />
                    <span className='line'>
                        <a> <Link to='/register'>Register</Link></a>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login;