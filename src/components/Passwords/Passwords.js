import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiFillLock, AiFillCloseCircle, AiTwotoneEdit, AiOutlineClose} from "react-icons/ai";
import axios from '../../api/axios';
import ViewPassword from '../../views/ViewPassword/ViewPassword';
import EditPassword from '../../views/EditPassword/EditPassword';
import Delete from '../../views/Delete/Delete';
import './Password.css'
// Response 401, redirigir por expiracion del token
const GET_PASSWORD_URL = 'https://squid-app-4c5rx.ondigitalocean.app/creds/';


function Passwords () {

    let navigate = useNavigate();

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
            if (!err?.response) {
                console.log("error");
            } else if (err.response?.status === 401) {
                window.localStorage.removeItem('user-session');
                return navigate('/');
            } else {
                console.log("error");
            }
        }
    }

    const handleFilter = (event) => { 
        setFilter(event.target.value);
        console.log(filter);
    }

    const handlePopUp = (pswd) => {
        console.log(pswd);
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
                                                <Delete pwd={item.id} />
                                                <ViewPassword website={item.website} username={item.username} bytes={item.bytes}/>
                                                <EditPassword pid={item.id} website={item.website} username={item.username} bytes={item.bytes} passwords={passwords} setPasswords={setPasswords}/>
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