//import './App.css';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import RequireAuth from './components/Auth/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Passwords from './components/Passwords/Passwords';
import Panel from './views/Panel/Panel';
import AddPassword from './views/AddPassword/AddPassword';
import Help from './views/Help/Help';

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
      <Route path='' element={<Login />} />
      <Route path=':msg' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route path='home' element={<Dashboard />}>
          <Route path='main' element={<Passwords />} />
          <Route path='panel' element={<Panel />} />
          <Route path='form' element={<AddPassword />} />
          <Route path='help' element={<Help />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
