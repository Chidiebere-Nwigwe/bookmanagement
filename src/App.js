import "./App.css";
import HomePage from "./components/HomePage.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./components/UserPage.js";
import Administrator from "./components/Administrator.js";
import Form from "./components/Form.js";
import BookDetails from "./components/BookDetails.js";
import EditForm from "./components/EditForm.js";
import NotFound from "./components/NotFound.js";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Form />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/administrator" element={<Administrator />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
