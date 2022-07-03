import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { BsFillHouseDoorFill, BsFillStarFill, BsGearFill, BsCardList, BsPower, BsFillQuestionCircleFill, BsFillShieldLockFill, BsFillPlusCircleFill } from 'react-icons/bs';
import './Dashboard.css'

function Dashboard () {
    let navigate = useNavigate();
    return (
        <div id="conteiner3">
            <div className="navbar">
                <a href="" className="logo"><i className="fa-solid fa-dumbbell"><BsFillShieldLockFill /></i>Password Manager</a>
            </div>
            <nav className="main-menu">
                <ul>
                    <li>
                        <a>
                            <Link to='main'>
                                <i className="fa fa-home fa-2x"><BsFillHouseDoorFill /></i>
                                <span className="nav-text">
                                    Todos los elementos
                                </span>
                            </Link>
                        </a>
                    </li>
                    <li className="has-subnav">
                        <a>
                            <Link to='panel'>
                                <i className="fa fa-laptop fa-2x"><BsCardList /></i>
                                <span className="nav-text">
                                    Panel de Seguridad
                                </span>
                            </Link>
                        </a>  
                    </li>
                    <li className="has-subnav">
                        <a>
                            <Link to='form'>
                                <i className="fa fa-laptop fa-2x"><BsFillPlusCircleFill /></i>
                                <span className="nav-text">
                                    Nueva Contraseña
                                </span>
                            </Link>
                        </a>
                        
                    </li>
                </ul>

                <ul className="logout">
                    <li className="has-subnav">
                        <a href="#">
                        <i className="fa fa-list fa-2x"><BsGearFill /></i>
                            <span className="nav-text">
                                Configuración
                            </span>
                        </a>
                        
                    </li>
                    <li className="has-subnav">
                        <a href="#">
                        <i className="fa fa-list fa-2x"><BsFillQuestionCircleFill /></i>
                            <span className="nav-text">
                                Ayuda
                            </span>
                        </a>
                        
                    </li>
                    <li>
                    <a onClick={() => {
                        window.localStorage.removeItem('user-session');
                        return navigate('/');
                    }}>

                            <i className="fa fa-power-off fa-2x"><BsPower /></i>
                            <span className="nav-text">
                                Cerrar Sesión
                            </span>
                        </a>
                    </li>  
                </ul>
            </nav>
            <div className='body-text'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard;
