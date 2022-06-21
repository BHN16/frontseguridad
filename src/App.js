//import './App.css';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import RequireAuth from './components/Auth/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Passwords from './components/Passwords/Passwords';
import Favorites from './views/Favorites/Favorites';
import Panel from './views/Panel/Panel';
import AddPassword from './views/AddPassword/AddPassword';

// /creds/ GET token
// /cred/ PUT token

function App() {
  return (
    <Routes>
      <Route path='' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route path='home' element={<Dashboard />}>
          <Route path='main' element={<Passwords />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='panel' element={<Panel />} />
          <Route path='form' element={<AddPassword />} />
        </Route>
      </Route>
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
