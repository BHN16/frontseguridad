import React from 'react'
import Popup from 'reactjs-popup';
import { AiFillLock } from "react-icons/ai";
import './ViewPassword.css'

function ViewPassword() {
    return(
        <Popup trigger={
            <i  className='view-buttom'><button className="button"><AiFillLock /></button></i>
            } modal>
            <div className='modal-password'>
                <form>
                    <div>
                        <h3>Master Password: </h3>
                        <input type="password"/>
                    </div>
                    <div>
                        <h4>Pagina</h4>
                        <h4>Usuario/Login</h4>
                        <h4>Contraseña</h4>
                    </div>
                    
                </form>
            </div>
        </Popup>
    )
}

export default ViewPassword;