import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Password ( { validPwd, setPwd, setPwdFocus, pwdFocus, pwd }) {
    return (
        <>
            <label htmlFor='password'>
                Password:
                <span className={ validPwd ? 'valid' : 'hide' }>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={ validPwd || !pwd ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
                type='password' 
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                autoComplete='off'
                required
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby='pwdnote'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)} />
            <p
                id='pwdnote' 
                className={ pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                8 to 24 characters.<br/>
                Must include uppercase and lowercase letters, a number and a special character<br/>
                Allowed special characters: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span> <span aria-label='dollar-sign'>$</span> <span aria-label='percent'>%</span>
            </p>
        </>
    );
}

export default Password;