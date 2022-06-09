//import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Register />} />
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
