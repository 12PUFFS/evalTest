import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProjectList from './components/ProjectList/ProjectList';
import ProjectDetails from './components/ProjectDetails/ProjectDetails'; // ← ИЗМЕНИ ИМПОРТ

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
