import { useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Username from './Username';
import Password from './Password';
import MatchPwd from './MartchPwd';
import axios from '../../api/axios';
import './Register.css';
import { clear } from '@testing-library/user-event/dist/clear';
//import { Link } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = 'http://137.184.83.170:5000/auth';

function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
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
        const email = 'asdfasdf';
        try {
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify(
                    { 
                        username: user, 
                        password: pwd,
                        email: email
                    }),
                {
                    headers: { 'Content-type': 'application/json' }
                });
            console.log(JSON.stringify(response?.data));
            console.log('asdf');
            setSuccess(true);
            clearFields();
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No server respone');
            } else if(err.response?.status === 409) {
                setErrMsg('Username taken');
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
                    <Password 
                        validPwd={ validPwd } 
                        setPwd={ setPwd } 
                        setPwdFocus={ setPwdFocus } 
                        pwdFocus={ pwdFocus } 
                        pwd={ pwd } />
                    <MatchPwd
                        validMatch={ validMatch}
                        matchPwd={ matchPwd }
                        setMatchPwd={ setMatchPwd }
                        setMatchFocus={ setMatchFocus }
                        matchFocus={ matchFocus } />
                    <button disabled={ !validName || !validPwd || !validMatch ? true : false} className='register-button'>
                        Sign up
                    </button>
                </form>
                <p>
                    Already registered? <br />
                    <span className='line'>
                        <a href='#'>Login</a>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register;

    /*return (
<Link to='/login'>Login</Link>
        <div>
        Pagina de register
        <nav>
        <Link to='/'>home</Link>
        </nav>
        </div>
        )
        <label htmlFor='username'>
            Username
            <span className={ validName ? 'valid' : 'hide' }>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={ validName || !user ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </label>
        <input 
            type='text' 
            id='username' 
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? 'false' : 'true'}
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)} />
        <p
            id='uidnote' 
            className={ userFocus && user && !validName ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            4 to 14 characters.<br/>
            Must begin with a letter.<br/>
            Letters, numbers, underscores, hyphens allowed.
        </p>*/
