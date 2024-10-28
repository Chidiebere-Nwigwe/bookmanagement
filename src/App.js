
import './App.css';
import HomePage from './components/HomePage.js'
import LoginPage from './components/LoginPage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './components/UserPage.js';
import Administrator from './components/Administrator.js'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/administrator' element={<Administrator />} />



      </Routes>

    </Router>
  );
}

export default App;
