import React, { useState, useEffect } from 'react'
import { BsFillHouseDoorFill, BsFillLaptopFill, BsCardList, BsFillFolderFill, BsFillBarChartFill, BsFonts, BsTable, BsPinMapFill, BsFileFontFill, BsPower } from 'react-icons/bs';
import './Dashboard.css'

function Dashboard () {

    return (
        <div id="conteiner3">
            <div class="navbar">
            </div>
            <nav class="main-menu">
                <ul>
                    <li>
                        <a href="#">
                            <i class="fa fa-home fa-2x"><BsFillHouseDoorFill /></i>
                            <span class="nav-text">
                                Dashboard
                            </span>
                        </a>
                    
                    </li>
                    <li class="has-subnav">
                        <a href="#">
                            <i class="fa fa-laptop fa-2x"><BsFillLaptopFill /></i>
                            <span class="nav-text">
                                Stars Components
                            </span>
                        </a>
                        
                    </li>
                    <li class="has-subnav">
                        <a href="#">
                        <i class="fa fa-list fa-2x"><BsCardList /></i>
                            <span class="nav-text">
                                Forms
                            </span>
                        </a>
                        
                    </li>
                    <li class="has-subnav">
                        <a href="#">
                        <i class="fa fa-folder-open fa-2x"><BsFillFolderFill /></i>
                            <span class="nav-text">
                                Pages
                            </span>
                        </a>
                    
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa fa-bar-chart-o fa-2x"><BsFillBarChartFill /></i>
                            <span class="nav-text">
                                Graphs and Statistics
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa fa-font fa-2x"><BsFonts /></i>
                            <span class="nav-text">
                            Quotes
                            </span>
                        </a>
                    </li>
                    <li>
                    <a href="#">
                        <i class="fa fa-table fa-2x"><BsTable /></i>
                            <span class="nav-text">
                                Tables
                            </span>
                        </a>
                    </li>
                    <li>
                    <a href="#">
                            <i class="fa fa-map-marker fa-2x"><BsPinMapFill /></i>
                            <span class="nav-text">
                                Maps
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <i class="fa fa-info fa-2x"><BsFileFontFill /></i>
                            <span class="nav-text">
                                Documentation
                            </span>
                        </a>
                    </li>
                </ul>

                <ul class="logout">
                    <li>
                    <a href="#">
                            <i class="fa fa-power-off fa-2x"><BsPower /></i>
                            <span class="nav-text">
                                Logout
                            </span>
                        </a>
                    </li>  
                </ul>
            </nav>
        </div>
    )
}

export default Dashboard;