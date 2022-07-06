import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { AiFillLock } from "react-icons/ai";
import { AES_Decrypt, hashPassword } from '../../utils/Encription';
import './ViewPassword.css'

function ViewPassword({ website, username, bytes }) {

    const INITIAL_STATE = bytes;

    const [password, setPassword] = useState();
    const [masterPassword, setMasterPassword] = useState('');
    const [showView, setShowView] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setMasterPassword('');
        setOpen(false);
        setShowView(false);
        setPassword(INITIAL_STATE);
    }

    const handleMasterPassword = (e) => {
        e.preventDefault();
        if (hashPassword(hashPassword(masterPassword)) === JSON.parse(window.localStorage.getItem('user-session')).password) {
            setPassword(AES_Decrypt(bytes, hashPassword(hashPassword(masterPassword))));
            setShowPassword(false);
            setShowView(true);
            console.log(password);
        } else {
            console.log('Clave incorrecta');
        }
    }

    const handleDecrypt = (e) => {
        e.preventDefault();
        setPassword(AES_Decrypt(password, hashPassword(hashPassword(password))));
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }


    return(
        <>
            <i  className='view-buttom'><button className="button" onClick={() => setOpen(o => !o)}><AiFillLock /></button></i>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
                <div className='modal-password'>
                    <div className='conteinerView'>
                        <div className='cointainerHeader'>
                            <header>
                            <h1> Content Password </h1>
                            </header>
                        </div>
                        <div className='containerPassBody'>
                                {
                                    (showView) ? 
                                    <div className='containerContent'>
                                        <div>
                                            <h4 className='col'>Page:</h4><p className='col'> { website } </p>
                                        </div>
                                        <div>
                                            <h4 className='col'>User/Email:</h4><p className='col'> { username } </p> 
                                        </div>
                                        <div>
                                            <h4 className='col'>Password:</h4><p className='col'> { password } </p>
                                        </div>
                                    </div> : 
                                    <div className="containerForm">
                                        <form onSubmit={handleMasterPassword}>
                                            <div>
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
                                    </div>
                                }
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}

export default ViewPassword;