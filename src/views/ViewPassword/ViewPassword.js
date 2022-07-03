import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import { AiFillLock } from "react-icons/ai";
import { AES_Decrypt, hashPassword } from '../../utils/Encription';
import './ViewPassword.css'

function ViewPassword({ website, username, bytes }) {

    const INITIAL_STATE = bytes;

    const [decrypt, setDecrypt] = useState(bytes);
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const closeModal = () => {
        setPassword('');
        setOpen(false);
    }

    const handleDecrypt = (e) => {
        e.preventDefault();
        setDecrypt(AES_Decrypt(decrypt, hashPassword(hashPassword(password))));
    }

    useEffect(() => {
        if (password === '') {
            setDecrypt(INITIAL_STATE);
        }
    }, [password])

    return(
        <>
            <i  className='view-buttom'><button className="button" onClick={() => setOpen(o => !o)}><AiFillLock /></button></i>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className='modal-password'>
                    <form onSubmit={handleDecrypt}>
                        <div>
                            <h3>Master Password: </h3>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </div>
                        <div>
                            <input type="submit" value="Guardar"/>
                        </div>
                    </form>
                    <div>
                        <h4>Pagina: { website }</h4>
                        <h4>Usuario/Login: { username } </h4>
                        <h4>Contraseña: { decrypt } </h4>
                    </div>
                </div>
            </Popup>
        </>
    )
}

export default ViewPassword;