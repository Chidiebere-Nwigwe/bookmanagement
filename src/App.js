
import './App.css';
import HomePage from './components/HomePage.js'
import LoginPage from './components/LoginPage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './components/UserPage.js';
import Administrator from './components/Administrator.js'


// added the below
import Form from './components/Form.js'
// import backgroundImage from './img/Group 38.png'


function App() {
  return (
    <Router>
      <div className='backImage'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/user' element={<UserPage />} />

          {/* i added the below */}
          <Route path='/administrator' element={<Administrator />} />
        
          {/* i added the below */}
          <Route path='/form' element={<Form />} /> 



        </Routes>
      </div>
    </Router>
  );
}

export default App;
