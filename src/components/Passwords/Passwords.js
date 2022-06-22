import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AiFillLinkedin, AiFillTwitterSquare, AiFillGithub, AiFillLock, AiFillPlusSquare } from "react-icons/ai";
import './Password.css'

function Passwords () {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='body-password'>
            <div className='search'>
                <input type="search" placeholder="Buscar..." />
            </div>
            <div className='card-list'>
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