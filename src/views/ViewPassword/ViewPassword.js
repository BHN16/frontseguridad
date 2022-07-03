import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import { AiFillLock } from "react-icons/ai";
import { AES_Decrypt } from '../../utils/Encription';
import './ViewPassword.css'

function ViewPassword({ website, username, bytes }) {
    return(
        <Popup trigger={
            <i  className='view-buttom'><button className="button"><AiFillLock /></button></i>
            } modal>
            <div className='modal-password'>
                <div>
                    <h4>Pagina: { website }</h4>
                    <h4>Usuario/Login: { username } </h4>
                    <h4>Contraseña: { AES_Decrypt(bytes, JSON.parse(window.localStorage.getItem('user-session')).password) } </h4>
                </div>
            </div>
        </Popup>
    )
}

export default ViewPassword;