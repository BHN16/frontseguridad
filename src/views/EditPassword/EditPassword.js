import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import { AiTwotoneEdit } from "react-icons/ai";
import axios from '../../api/axios';
import './EditPassword.css'

function EditPassword() {

    const [page, setPage] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = async (e) => {
        e.preventDefault();
        try {

        } catch (err) {

        }
    }

    return (
    <Popup trigger={
            <i  className='edit-buttom'><button className="button"><AiTwotoneEdit /></button></i>
        } modal>
        <div className='modal'>
            <div className=''>
                <div className="">
                    <header>
                    <h1> Nueva Contraseña </h1>
                    </header>
                </div>
                <div className="">
                    <form>
                        <p>
                            Usuario o Email:
                            <input 
                                type="text" 
                                value={user}
                                required 
                            />
                        </p>
                        <p>
                            Contraseña:
                            <input 
                                style={{width:'100%'}}
                                value={password} 
                                required
                            />
                            <div style={{ padding: 0, fontSize: '17px'}}> 
                                <input type='checkbox'/>
                            </div>
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
    </Popup>
    )
}


export default EditPassword;