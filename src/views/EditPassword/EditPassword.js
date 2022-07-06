import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { AiTwotoneEdit } from "react-icons/ai";
import axios from '../../api/axios';
import { AES_Decrypt, AES_Encrypt, hashPassword } from '../../utils/Encription';
import './EditPassword.css'

const EDIT_PASSWORD_URL = 'https://squid-app-4c5rx.ondigitalocean.app/cred/';

function EditPassword({ pid, website, username, bytes, passwords, setPasswords }) {

    let navigate = useNavigate();

    const [masterPassword, setMasterPassword] = useState('');

    const [page, setPage] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [showEdit, setShowEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const userRef = useRef();

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
        } else {
            alert('Clave incorrecta');
        }
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
        } catch (err) {
            if (!err?.response) {
                console.log("error");
            } else if (err.response?.status === 401) {
                window.localStorage.removeItem('user-session');
                return navigate('/');
            } else {
                console.log("error");
            }
        }
    }

    return (
        <>
            <i  className='edit-buttom'><button className="button" onClick={() => setOpen(o => !o)}><AiTwotoneEdit /></button></i>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
                <div className='modal'>
                    <div className='conteinerEdit'>
                        <div className="cointainerHeader">
                            <header>
                            <h1> Edit Password </h1>
                            </header>
                        </div>
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
                                    <p>
                                        Password:
                                        <input 
                                            type={showPassword?'text':'password'}
                                            value={password}
                                            style={{width:'100%'}} 
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                            />
                                        <div style={{ padding: 0, fontSize: '17px'}}> 
                                            <span>{showPassword? <>Hide password</> : <>Show password</>}</span>    
                                            <input type='checkbox'  onChange={togglePassword}/>
                                        </div>
                                    </p>
                                    <div>
                                        <input type="submit" value="Save"/>
                                    </div>
                                    <div>
                                        <input type="reset" value="Cancel"/>
                                    </div>
                                </form>
                                : <form onSubmit={handleMasterPassword}>
                                    <div>
                                        <p>
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
                                        </p>
                                    </div>
                                    <div>
                                        <input type="submit" value="Submit"/>
                                    </div>
                                </form>

                            }
                        </div>
                    </div>
                </div>
                </Popup>
        </>
    )
}


export default EditPassword;