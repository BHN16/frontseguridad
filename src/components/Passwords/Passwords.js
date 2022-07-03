import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { AiFillLock, AiFillCloseCircle, AiTwotoneEdit, AiOutlineClose} from "react-icons/ai";
import axios from '../../api/axios';
import './Password.css'
// Response 401, redirigir por expiracion del token
const GET_PASSWORD_URL = 'http://137.184.83.170/creds/';
const DELETE_PASSWORD_URL = 'http://137.184.83.170/cred/';


function Passwords () {
    const firstRender = useRef(true);
    const [show, setShow] = useState(false);
    const [passwords, setPasswords] = useState([]);
    const [filter, setFilter] = useState('');
    const [bytes, setBytes] = useState();
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        getPasswords();
    }, []);

    useEffect(() => {
        getPasswords();
    }, [show]);

    const deletePassword = async(pswd) => {
        try {
            const response = await axios.delete(DELETE_PASSWORD_URL,
                {
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('user-session')).token,
                        'Content-type': 'application/json',
                    },
                    data: {
                        id: pswd
                    }
                });
            setShow(!show);
        } catch (err) {
            console.log('error', pswd);
            console.log(err);
            console.log(JSON.parse(window.localStorage.getItem('user-session')).token);
        }
    }

    const getPasswords = async (e) => {
        try {
            const response = await axios.get(GET_PASSWORD_URL,
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('user-session')).token
                    }
                });  
            setPasswords(response.data);
        } catch(err) {
            console.log('error');
        }
    }

    const handleFilter = (event) => { 
        setFilter(event.target.value);
        console.log(filter);
    }

    const handlePopUp = (pswd) => {
        console.log(pswd);
    }

    const prueba = () => {
        console.log("hola");
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='body-password'>
            <div className='search'>
                <input type="search" value={filter} onChange={handleFilter} />
            </div>
            <div className='card-list'>
                {
                    passwords.length
                        ? ( filter === ''
                            ? passwords.map((item) => {
                                console.log(item)
                                return (
                                    <div className='card' key={item.id}>
                                        <div className='face face1'>
                                            <div className='content'>
                                                <div className='icon'>
                                                    <i className='fa fa-linkedin-square'><AiFillLock /></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='face face2'>
                                            <div className='content'>
                                                <h3>
                                                    <a href="https://www.linkedin.com/" target="_blank">{item.website}</a>
                                                </h3>
                                                <p>{item.username}</p>
                                                <i  className='cancel-buttom'><button onClick={() => deletePassword(item.id)}><AiFillCloseCircle /></button></i>
                                                <Popup trigger={ <button className="button"> Password </button> } modal>
                                                    <div className='modal-password'>
                                                        <form>
                                                            <div>
                                                                <h3>Master Password: </h3>
                                                                <input type="password"/>
                                                            </div>
                                                            <div>
                                                                <h4>Pagina {item.website}</h4>
                                                                <h4>Usuario/Login {item.username}</h4>
                                                                <h4>Contraseña {bytes}</h4>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </Popup>
                                                <Modal password={passwords.find( element => element.id === item.id )} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : passwords
                                .filter((item) => {
                                    return (item.website.toLowerCase().startsWith(filter.toLowerCase()))
                                })
                                .map((item) => {
                                    return (
                                        <div className='card'>
                                            <div className='face face1'>
                                                <div className='content'>
                                                    <div className='icon'>
                                                        <i className='fa fa-linkedin-square'><AiFillLock /></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='face face2'>
                                                <div className='content'>
                                                    <h3>
                                                        <a href="https://www.linkedin.com/" target="_blank">{item.website}</a>
                                                    </h3>
                                                    <p>{item.username}</p>
                                                    <i className='cancel-buttom'><button onClick={() => deletePassword(item.id)}><AiOutlineClose /></button></i>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        ) 
                        : <> 
                            <h1>Loading passwords</h1>
                        </>
                }
                
        </div>
    </div>
    )
}

function Modal({ password = {} }) {

    const [pswd, setPswd] = useState(password)

    return (
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
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
                        Pagina:
                        <input 
                            type="text" 
                            required 
                        />  
                    </p>
                    <p>
                        Usuario o Email:
                        <input 
                            type="text" 
                            required 
                        />
                    </p>
                    <p>
                        Contraseña:
                        <input 
                            style={{width:'100%'}} 
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

export default Passwords;