//import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import RequireAuth from './components/Auth/RequireAuth';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route path='home' element={<Dashboard />} />
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
