
import './App.css';
import HomePage from './components/HomePage.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './components/UserPage.js';
import EditPage from './components/EditPage.js';
import Administrator from './components/Administrator.js'
import Form from './components/Form.js'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Form />} />

        <Route path='/user' element={<UserPage />} />
        <Route path='/administrator' element={<Administrator />} />
        <Route path='/edit/:id' element={<EditPage />} />
      </Routes>
      
    </Router>
  );
}

export default App;