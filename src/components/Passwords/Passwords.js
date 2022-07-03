import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { AiFillLock, AiOutlineClose } from "react-icons/ai";
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
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        getPasswords();
    }, []);

    const deletePassword = async(pswd) => {
        try {
            const response = await axios.delete(DELETE_PASSWORD_URL,
                JSON.stringify({
                    id: pswd
                }),
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('user-session')).token
                    }
                });
        } catch(err) {
            console.log('error');
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
                                                <i  className='cancel-buttom'><button onClick={() => deletePassword(item.id)}><AiOutlineClose /></button></i>
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

export default Passwords;