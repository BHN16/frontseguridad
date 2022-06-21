//import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';

function AES_Encrypt(key, text) {
  var aesjs = require('aes-js');
  var textBytes = aesjs.utils.utf8.toBytes(text);

  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);

  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

function AES_Decrypt(key, encryptedHex) {
  var aesjs = require('aes-js');
  var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);

  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
    </Routes>
  );

  /*return (
    <div className="App">
      <header>
        <h3>Página principal</h3>
      </header>
      <nav>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link> 
      </nav>
    </div>
  );*/
}

export default App;
