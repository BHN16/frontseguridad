import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Username ( { validName, userRef, setUser, setUserFocus, userFocus, user }) {
    return (
        <>
            <label htmlFor='username'>
                Username:
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
            </p>
        </>
    );
}

export default Username;