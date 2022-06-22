import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { AiFillLinkedin, AiFillTwitterSquare, AiFillGithub, AiFillLock, AiFillPlusSquare } from "react-icons/ai";
import axios from '../../api/axios';
import './Password.css'

const GET_PASSWORD_URL = 'http://137.184.83.170/creds/';

function Passwords () {
    const firstRender = useRef(true);
    const [show, setShow] = useState(false);
    const [passwords, setPasswords] = useState([]);
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        getPasswords();
    }, [])

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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='body-password'>
            <div className='search'>
                <input type="search" placeholder="Buscar..." />
            </div>
            <div className='card-list'>
                {
                    passwords.length?
                        passwords.map((item) => {
                            <div className='card'>
                                <div className='face face1'>
                                    <div className='content'>
                                        <div className='icon'>
                                            <i className='fa fa-linkedin-square'><AiFillLinkedin /></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='face face2'>
                                    <div className='content'>
                                        <h3>
                                            <a href="https://www.linkedin.com/" target="_blank">{item.website}</a>
                                        </h3>
                                        <p>{item.id}</p>
                                    </div>
                                </div>
                            </div>
                    }) :
                        <> 
                                <div className='card'>
                                    <div className='face face1'>
                                        <div className='content'>
                                            <div className='icon'>
                                                <i className='fa fa-linkedin-square'><AiFillLinkedin /></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='face face2'>
                                        <div className='content'>
                                            <h3>
                                                <a href="https://www.linkedin.com/" target="_blank">LinkedIn</a>
                                            </h3>
                                            <p>_adampinto</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='face face1'>
                                        <div className='content'>
                                            <div className='icon'>
                                                <i className='fa fa-twitter-square' aria-hidden='true'><AiFillTwitterSquare /></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='face face2'>
                                        <div className='content'>
                                            <h3>
                                                <a href="https://twitter.com/" target="_blank">Twitter</a>
                                            </h3>
                                            <p>AdamDipinto</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='face face1'>
                                        <div className='content'>
                                            <div className='icon'>
                                                <i className='fa fa-github-square' aria-hidden='true'><AiFillGithub /></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='face face2'>
                                        <div className='content'>
                                            <h3>
                                                <a href="https://github.com/" target="_blank">Github</a>
                                            </h3>
                                            <p>atom888.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='face face1'>
                                        <div className='content'>
                                            <div className='icon'>
                                                <i className='fa fa-github-square' aria-hidden='true'><AiFillLock /></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='face face2'>
                                        <div className='content'>
                                            <h3>
                                                <a href="https://github.com/" target="_blank">Github</a>
                                            </h3>
                                            <p>atom888</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='face face1'>
                                        <div className='content'>
                                            <div className='icon'>
                                                <i className='fa fa-github-square' aria-hidden='true'><AiFillLock /></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='face face2'>
                                        <div className='content'>
                                            <h3>
                                                <a href="https://github.com/" target="_blank">Github</a>
                                            </h3>
                                            <p>atom888</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='face face1'>
                                        <div className='content'>
                                            <div className='icon'>
                                                <i className='fa fa-github-square' aria-hidden='true'><AiFillLock /></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='face face2'>
                                        <div className='content'>
                                            <h3>
                                                <a href="https://github.com/" target="_blank">Github</a>
                                            </h3>
                                            <p>atom888</p>
                                        </div>
                                    </div>
                                </div>
                        </>
                }
                <div className='card'>
                    <a>      
                        <Link to='../form'>
                            <div className='face face1'>
                                <div className='content'>
                                    <div className='icon'>
                                        <i className='fa fa-github-square' aria-hidden='true'><AiFillPlusSquare /></i>
                                    </div>
                                </div>
                            </div>
                            <div className='face face2'>
                                <div className='content'>
                                    <h3>
                                        <a target="_blank">Nueva Contraseña</a>
                                    </h3>
                                </div>
                            </div>
                        </Link>                
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Passwords;