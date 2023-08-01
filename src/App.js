import { Route, Routes } from 'react-router-dom';
import './App.css';
import './style/Animations.css';
import Home from './pages/Home';
import About from './pages/About';
import TopProjects from './pages/TopProjects';
import ProjectDetails from './pages/ProjectDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/about' element={ <About /> } />
        <Route path='/projects/:id' element={ <ProjectDetails /> } />
        <Route path='/projects' element={ <TopProjects /> } />
        <Route exact path='/' element={ <Home /> } />
      </Routes>
    </div>
  );
}

export default App;
