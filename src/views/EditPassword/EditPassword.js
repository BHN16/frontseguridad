import React, { useState, useRef, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { AiTwotoneEdit } from "react-icons/ai";
import axios from '../../api/axios';
import { AES_Decrypt, AES_Encrypt, hashPassword } from '../../utils/Encription';
import './EditPassword.css'

const EDIT_PASSWORD_URL = 'https://squid-app-4c5rx.ondigitalocean.app/cred/';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function EditPassword({ pid, website, username, bytes, passwords, setPasswords }) {

    let navigate = useNavigate();

    const [masterPassword, setMasterPassword] = useState('');

    const [page, setPage] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [pwdFocus, setPwdFocus] = useState(false);

    const closeModal = () => {
        resetForm();
        setOpen(false);
    }

    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPwd(result);
    }, [password]);

    const updatePasswords = (id, pass) => {
        let items = passwords.map((item) => {
            if (item.id === id) {
                item.website = page;
                item.username = user;
                item.bytes = pass;
            }
            return item;
        })
        setPasswords(items);
    }
    
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMasterPassword = (e) => {
        e.preventDefault();
        if (hashPassword(hashPassword(masterPassword)) === JSON.parse(window.localStorage.getItem('user-session')).password) {
            setPage(website);
            setUser(username);
            setPassword(AES_Decrypt(bytes, hashPassword(hashPassword(masterPassword))));
            setShowPassword(false);
            setShowEdit(true);
            setErrMsg('');
        } else {
            setErrMsg('Clave incorrecta');
        }
    }

    const resetForm = () => {
        setShowEdit(false);
        setPage('');
        setMasterPassword('');
        setUser('');
        setPassword('');
        setShowPassword(false);
        setErrMsg('');
    }

    const changePassword = async (e) => {
        try {
            e.preventDefault();
            const pass = await AES_Encrypt(password, hashPassword(hashPassword(masterPassword)));
            const response = await axios.put(EDIT_PASSWORD_URL,
                JSON.stringify({
                    id: pid,
                    website: page,
                    username: user,
                    bytes: pass
                }),
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('user-session')).token
                    }
                });
            await updatePasswords(pid, pass);
            console.log(response);
            setErrMsg('Editado correctamente');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Error al registrarse');
                console.log("error");
            } else if (err.response?.status === 401) {
                window.localStorage.removeItem('user-session');
                let msg = 'Session expired';
                return navigate(`/${msg}`);
            } else {
                setErrMsg('Error en el servidor');
                console.log("error");
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <i  className='edit-buttom'><button className="button" onClick={() => setOpen(o => !o)}><AiTwotoneEdit /></button></i>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
                <div className='modal'>
                    <div className="cointainerHeader">
                        <div className='conteinerEdit'>
                            <header>
                            <p ref={ errRef } className={ errMsg ? (errMsg[0] === 'E'?'no-err' : 'err-edit' ) : 'offscreen' } aria-live='assertive'>{ errMsg }</p>
                            <h1> Edit Password </h1>
                            </header>
                            <div className="containerForm">
                            {
                                (showEdit) 
                                ? <form onSubmit={changePassword}>
                                    <p>
                                        Page:
                                        <input 
                                            type="text" 
                                            required 
                                            value={page}
                                            ref={userRef}
                                            onChange={(e) => setPage(e.target.value)}
                                            />  
                                    </p>
                                    <p>
                                        User/Email:
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
                                            <input type='checkbox'  onChange={togglePassword}/>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="submit" value="Save"/>
                                    </div>
                                    <div>
                                        <input type="reset" value="Cancel" onClick={resetForm}/>
                                    </div>
                                </form>
                                : <form onSubmit={handleMasterPassword}>
                                    <div style={{ padding: 10, fontSize: '22px'}}>
                                        Master Password: 
                                        <input 
                                            type={showPassword?'text':'password'}
                                            value={masterPassword}
                                            onChange={(e) => setMasterPassword(e.target.value)}
                                            />
                                        <div style={{ padding: 0, fontSize: '17px'}}> 
                                            <span>{showPassword? <>Hide password</> : <>Show password</>}</span>    
                                            <input type='checkbox'  onChange={togglePassword}/>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="submit" value="Submit"/>
                                    </div>
                                </form>
                            }
                            </div>
                        </div>
                    </div>
                </div>
                </Popup>
        </>
    )
}


export default EditPassword;