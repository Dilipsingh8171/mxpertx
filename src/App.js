import './App.css';
import HomePage from './mxpertz/HomePage';
import StoryPage from './mxpertz/StoryPage';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:id" element={<StoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
