import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Email ( { validEmail, setEmail, setEmailFocus, emailFocus, email }) {
    return (
        <>
            <label htmlFor='email'>
                Email:
                <span className={ validEmail ? 'valid' : 'hide' }>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={ validEmail || !email ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
                type='text' 
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='off'
                required
                aria-invalid={validEmail ? 'false' : 'true'}
                aria-describedby='emailnote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)} />
            <p
                id='emailnote' 
                className={ emailFocus && !validEmail ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Enter a valid email.<br/>
                Example: test@gmail.com
            </p>
        </>
    );
}

export default Email;