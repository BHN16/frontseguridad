import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../api/axios';
import { AES_Encrypt } from '../../utils/Encription';
import './AddPassword.css'

const ADD_PASSWORD_URL = 'https://squid-app-4c5rx.ondigitalocean.app/cred/';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function AddPassword () {

    let navigate = useNavigate();

    const [page, setPage] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [pwdFocus, setPwdFocus] = useState(false);
    const [validPwd, setValidPwd] = useState(false);

    const key = JSON.parse(window.localStorage.getItem('user-session')).password;

    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    },[]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPwd(result);
    }, [password]);

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
            if (!err?.response) {
                
            } else if (err.response?.status === 400) {
                console.log("bad request params");
            } else if (err.response?.status === 401) {
                window.localStorage.removeItem('user-session');
                let msg = 'Session expired';
                return navigate(`/${msg}`);
            } else {

            }
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const cleanInputs = () => {
        setPage('');
        setUser('');
        setPassword('');
        userRef.current.focus();
    }

    return (
        <div className='conteinerAddConteiner'>
            <div className='containerAdd'>
                <div className="cointainerHeader">
                    <header>  
                    <p className={ registered ? 'valid-add' : 'offscreen'} aria-live='assertive'>
                        { registered }
                    </p>
                    <h1> New password </h1>
                    </header>
                </div>
                <div className="containerb">
                <form onSubmit={handleSubmit}>
                    <p>
                        Web page:
                        <input 
                            type="text" 
                            required 
                            value={page}
                            ref={userRef}
                            onChange={(e) => setPage(e.target.value)}
                        />  
                    </p>
                    <p>
                        User or Email:
                        <input 
                            type="text" 
                            required 
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </p>
                    <div style={{ padding: 0, fontSize: '22px'}}>
                        <label htmlFor='password'>
                            Password:
                            <span className={ validPwd ? 'valid' : 'hide' }>
                                <FontAwesomeIcon icon={faCheck} />
                                <p>Strong password</p>
                            </span>
                            <span className={ validPwd || !password ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                                    <p>Weak password</p>
                            </span>
                        </label>
                        <input 
                            type={showPassword?'text':'password'}
                            value={password}
                            style={{width:'100%'}} 
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p
                            id='pwdnote' 
                            className={ pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            8 to 24 characters.<br/>
                            Must include uppercase and lowercase letters, a number and a special character<br/>
                            Allowed special characters: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span> <span aria-label='dollar-sign'>$</span> <span aria-label='percent'>%</span>
                        </p>
                        <div style={{ padding: 0, fontSize: '17px'}}>
                            <span>{showPassword? <>Hide password</> : <>Show password</>}</span>    
                            <input type='checkbox' onChange={togglePassword}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="submit" value="Save"/>
                        </div>
                        <div>
                            <input type="reset" value="Cancel" onClick={cleanInputs}/>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPassword;