import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Popup from 'reactjs-popup';
import { AiFillLock, AiFillCloseCircle, AiTwotoneEdit, AiOutlineClose} from "react-icons/ai";
const DELETE_PASSWORD_URL = 'https://squid-app-4c5rx.ondigitalocean.app/cred/';

function Delete ({ pwd }) {
    let navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const closeModal = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        deletePassword(pwd);
    }

    const deletePassword = async (pswd) => {
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

    return (
        <>
            <i  className='cancel-buttom'><button onClick={() => setOpen(o => !o)}><AiFillCloseCircle /></button></i>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
                <div className='modal'>
                        <div className="cointainerHeader">
                            <div className='conteinerEdit'>
                                <header>
                                <h1> Edit Password </h1>
                                </header>
                                <div className="containerForm">
                                    <form onSubmit={handleConfirm}>
                                        <div>
                                            <input type="submit" value="Confirm"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </Popup>
        </>
    )
}

export default Delete;