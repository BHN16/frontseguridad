import logo from './Assets/Img/Melgar.png';
import './App.css';
import Test from './Test.js';

function App() {
  let isOpen = false;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Melgar el más grande.
        </p>
        <Test isOpen = {isOpen}/>
      </header>
    </div>
  );
}

export default App;
