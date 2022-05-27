import logo from './Assets/Img/logo.svg';
import React, { useState } from 'react';

function Test(props) {
    const [count, setCount] = useState(props.isOpen);


    console.log(count);
    if(count) return (
    <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        </header>
        <button onClick={() => setCount( !count )}>Campeon</button>
    </div>
    );

    else 

    return(
        <button onClick={() => setCount( !count )}>Campeon</button>
    );

}

export default Test;
