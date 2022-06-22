import React, { useState, useEffect, useRef } from 'react'
import axios from '../../api/axios';
import { AES_Encrypt } from '../../utils/Encription';
import './AddPassword.css'

const ADD_PASSWORD_URL = 'http://137.184.83.170/cred/';

function AddPassword () {

    const [page, setPage] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

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
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className='conteinerAddConteiner'>
            <div className='containerAdd'>
                <div className="cointainerHeader">
                    <header>  
                    <h1>Nueva Contraseña</h1>
                    </header>
                </div>
                <div className="containerb">
                <form onSubmit={handleSubmit}>
                    <p>
                        Pagina:
                        <input 
                            type="text" 
                            required 
                            ref={userRef}
                            placeholder="www.example.com" 
                            onChange={(e) => setPage(e.target.value)}
                        />  
                    </p>
                    <p>
                        Usuario o Email:
                        <input 
                            type="text" 
                            required 
                            placeholder="abc123"
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </p>
                    <p>
                        Contraseña:
                        <input 
                            type="password"
                            style={{width:'100%'}} 
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />  
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