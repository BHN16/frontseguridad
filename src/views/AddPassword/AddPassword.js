import React, { useState, useEffect, useRef } from 'react'
import axios from '../../api/axios';
import { AES_Encrypt } from '../../utils/Encription';
import './AddPassword.css'

const ADD_PASSWORD_URL = 'http://137.184.83.170/cred/';

function AddPassword () {

    const [page, setPage] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const key = JSON.parse(window.localStorage.getItem('user-session')).password;

    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(key);
        const pass = await AES_Encrypt(password, key);
        try {
            const response = await axios.post(ADD_PASSWORD_URL,
                JSON.stringify({
                    web: page,
                    username: user,
                    bytes: pass
                }),
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('user-session')).token
                    }
                });
            console.log(response);
            setPage('');
            setUser('');
            setPassword('');
            setRegistered('Contraseña guardada');
        } catch(err){
            console.log(err);
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='conteinerAddConteiner'>
            <div className='containerAdd'>
                <div className="cointainerHeader">
                    <header>  
                    <p className={ registered ? 'valid' : 'offscreen'} aria-live='assertive'>
                        { registered }
                    </p>
                    <h1> Nueva Contraseña </h1>
                    </header>
                </div>
                <div className="containerb">
                <form onSubmit={handleSubmit}>
                    <p>
                        Pagina:
                        <input 
                            type="text" 
                            required 
                            value={page}
                            ref={userRef}
                            onChange={(e) => setPage(e.target.value)}
                        />  
                    </p>
                    <p>
                        Usuario o Email:
                        <input 
                            type="text" 
                            required 
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </p>
                    <p>
                        Contraseña:
                        <input 
                            type={showPassword?'text':'password'}
                            value={password}
                            style={{width:'100%'}} 
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div style={{ padding: 0, fontSize: '17px'}}>
                            <span>{showPassword? <>Hide password</> : <>Show password</>}</span>    
                            <input type='checkbox' onChange={togglePassword}/>
                        </div>
                    </p>
                    <div>
                        <input type="submit" value="Guardar"/>
                    </div>
                    <div>
                        <input type="reset" value="Cancelar"/>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPassword;