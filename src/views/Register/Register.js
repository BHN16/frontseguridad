import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Username from '../../components/Register/Username';
import Email from '../../components/Register/Email';
import Password from '../../components/Register/Password';
import MatchPwd from '../../components/Register/MatchPwd';
import axios from '../../api/axios';
import './Register.css';
import { clear } from '@testing-library/user-event/dist/clear';
import { hashPassword } from '../../utils/Encription';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;

const REGISTER_URL = 'https://squid-app-4c5rx.ondigitalocean.app/auth';

function Register() {

    let navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        if (success) {
            return navigate('/')
        }
    }, [success])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const clearFields = () => {
        setUser('');
        setPwd('');
        setMatchPwd('');
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const hashedPassword = await hashPassword(pwd);
        try {
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify(
                    { 
                        username: user, 
                        password: hashedPassword,
                        email: email
                    }),
                    {
                        headers: { 'Content-type': 'application/json' }
                    }
            );
            console.log(hashedPassword);
            setSuccess(true);
            clearFields();
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No server respone');
            } else if(err.response?.status === 400) {
                setErrMsg('Bad signup request params');
            } else {
                setErrMsg('Registration failed');
                console.log(err.response);
            }
        }
    }

    return (
        <div className='container-register-container'>
            <div className='register-container'>
                <p ref={errRef} className={ errMsg? 'errmsg' : 'offscreen'} aria-live='assertive'>{ errMsg }</p>
                <h1>Register</h1>
                <form onSubmit={ handleSubmit } className='register-form'>
                    <Username 
                        validName={ validName }
                        userRef={ userRef }
                        setUser={ setUser }
                        setUserFocus={ setUserFocus }
                        userFocus={ userFocus }
                        user={ user } />
                    <Email 
                        validEmail={ validEmail }
                        setEmail={ setEmail }
                        setEmailFocus={ setEmailFocus }
                        emailFocus={ emailFocus }
                        email={ email } />
                    <Password 
                        validPwd={ validPwd } 
                        setPwd={ setPwd } 
                        setPwdFocus={ setPwdFocus } 
                        pwdFocus={ pwdFocus } 
                        pwd={ pwd } 
                        showPassword={ showPassword } />
                    <MatchPwd
                        validMatch={ validMatch}
                        matchPwd={ matchPwd }
                        setMatchPwd={ setMatchPwd }
                        setMatchFocus={ setMatchFocus }
                        matchFocus={ matchFocus }
                        showPassword={ showPassword }
                        setShowPassword={ setShowPassword } />
                    
                        <br/>
                    <div style={{ padding: 0, fontSize: '17px'}}>
                        <input type="checkbox" label='ABC' required />
                        <span>Be carefull with your password, if you forget it you will lose your account.</span>    
                    </div>
                    
                    <button disabled={ !validName || !validPwd || !validMatch || !validEmail ? true : false} className='register-button'>
                        Sign up
                    </button>
                </form>
                <p>
                    Already registered? <br />
                    <span className='line'>
                        <Link to='/'>Login</Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register;
