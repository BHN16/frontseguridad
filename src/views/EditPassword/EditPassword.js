import React, { useState, useRef } from 'react'
import Popup from 'reactjs-popup';
import { AiTwotoneEdit } from "react-icons/ai";
import './EditPassword.css'

function EditPassword() {
    const [page, setPage] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [edited, setEdited] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const userRef = useRef();
    
    const togglePassword = () => {
        setShowPassword(!showPassword);
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
                            <form>
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
                                    <input type="submit" value="Saved"/>
                                </div>
                                <div>
                                    <input type="reset" value="Cancel"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </Popup>
        </>
    )
}


export default EditPassword;