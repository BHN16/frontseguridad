import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BsFillHouseDoorFill, BsFillStarFill, BsGearFill, BsCardList, BsPower, BsFillQuestionCircleFill, BsFillShieldLockFill } from 'react-icons/bs';
import Password from '../Passwords/Passwords';
import './Dashboard.css'

function Dashboard () {

    let navigate = useNavigate();

    return (
        <div id="conteiner3">
            <div class="navbar">
                <a href="" class="logo"><i class="fa-solid fa-dumbbell"><BsFillShieldLockFill /></i>Password Manager</a>
            </div>
            <nav class="main-menu">
                <ul>
                    <li>
                        <a href="#">
                            <i class="fa fa-home fa-2x"><BsFillHouseDoorFill /></i>
                            <span class="nav-text">
                                Todos los elementos
                            </span>
                        </a>
                    
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa fa-home fa-2x"><BsFillStarFill /></i>
                            <span class="nav-text">
                                Favoritos
                            </span>
                        </a>
                    </li>
                    <li class="has-subnav">
                        <a href="#">
                            <i class="fa fa-laptop fa-2x"><BsCardList /></i>
                            <span class="nav-text">
                                Panel de Seguridad
                            </span>
                        </a>
                        
                    </li>
                </ul>

                <ul class="logout">
                    <li class="has-subnav">
                        <a href="#">
                        <i class="fa fa-list fa-2x"><BsGearFill /></i>
                            <span class="nav-text">
                                Configuración
                            </span>
                        </a>
                        
                    </li>
                    <li class="has-subnav">
                        <a href="#">
                        <i class="fa fa-list fa-2x"><BsFillQuestionCircleFill /></i>
                            <span class="nav-text">
                                Ayuda
                            </span>
                        </a>
                        
                    </li>
                    <li>
                    <a onClick={() => {
                        window.localStorage.removeItem('user-session');
                        return navigate('/');
                    }}>

                            <i class="fa fa-power-off fa-2x"><BsPower /></i>
                            <span class="nav-text">
                                Cerrar Sesión
                            </span>
                        </a>
                    </li>  
                </ul>
            </nav>
            <div class="body-text">
                <Password />
            </div>
        </div>
    )
}

export default Dashboard;