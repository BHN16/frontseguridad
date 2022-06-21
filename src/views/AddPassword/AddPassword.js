import React, { useState, useEffect } from 'react'
import './AddPassword.css'

function AddPassword () {
    return (
        <div className='containerAdd'>
            <div className="cointainerHeader">
                <header>  
                <h1>Nueva Contraseña</h1>
                </header>
            </div>
            <div className="containerb">
            <form>
                <p>Pagina:<input type="text" required placeholder="www.example.com"/>  </p>
                <p>Usuario o Email:<input type="text" required placeholder="abc123"/>  </p>
                <p>Contraseña:<input type="text" required placeholder="abc123"/>  </p>
                <div>
                    <input type="submit" value="Guardar"/>
                </div>
                <div>
                    <input type="reset" value="Cancelar"/>
                </div>
                </form>
            </div>
        </div>
    )
}

export default AddPassword;