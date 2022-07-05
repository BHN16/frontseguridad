import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { AiFillLock } from "react-icons/ai";
import { AES_Decrypt, hashPassword } from '../../utils/Encription';
import './ViewPassword.css'

function ViewPassword({ website, username, bytes }) {

    const INITIAL_STATE = bytes;

    const [decrypt, setDecrypt] = useState(bytes);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setPassword('');
        setOpen(false);
    }

    const handleDecrypt = (e) => {
        e.preventDefault();
        setDecrypt(AES_Decrypt(decrypt, hashPassword(hashPassword(password))));
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        setDecrypt(INITIAL_STATE)
    }, [password])

    return(
        <>
            <i  className='view-buttom'><button className="button" onClick={() => setOpen(o => !o)}><AiFillLock /></button></i>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className='modal-password'>
                    <div className='conteinerView'>
                        <div className='cointainerHeader'>
                            <header>
                            <h1> Content Password </h1>
                            </header>
                        </div>
                        <div className='containerPassBody'>
                            <div className="containerForm">
                                <form onSubmit={handleDecrypt}>
                                    <div>
                                        <p>
                                        Master Password: 
                                        <input 
                                            type={showPassword?'text':'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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
                            </div>
                            <div className='containerContent'>
                                <div>
                                    <h4 className='col'>Page:</h4><p className='col'> { website } </p>
                                </div>
                                <div>
                                    <h4 className='col'>User/Email:</h4><p className='col'> { username } </p> 
                                </div>
                                <div>
                                    <h4 className='col'>Password:</h4><p className='col'> { decrypt } </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}

export default ViewPassword;