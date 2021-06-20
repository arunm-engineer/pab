import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Login/>
      </BrowserRouter>
    </div>
  );
}

export default App;
