import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MatchPwd ( { validMatch, matchPwd, setMatchPwd, setMatchFocus, matchFocus, showPassword, setShowPassword }) {

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <label htmlFor='confirm_pwd'>
                Confirm Password:
                <span className={ validMatch && matchPwd ? 'valid' : 'hide' }>
                    <FontAwesomeIcon icon={ faCheck } />
                </span>
                <span className={validMatch || !matchPwd ? 'hide' : 'invalid' }>
                    <FontAwesomeIcon icon={ faTimes } />
                </span>
            </label>
            <input 
                type={showPassword?'text':'password'}
                id='confirm_pwd'
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={ validMatch ? 'false' : 'true' }
                aria-describedby='confirmnote'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)} />
            <div style={{ padding: 0, fontSize: '17px'}}>
                <span>{showPassword? <>Hide passwords</> : <>Show passwords</>}</span>    
                <input type='checkbox' onChange={togglePassword}/>
            </div>
            <p id='confirmnote' className={ matchFocus && !validMatch ? 'instructions' : 'offscreen' }>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
            </p>
        </>
    );
}

export default MatchPwd;