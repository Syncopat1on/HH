import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AboutMePage from '../pages/AboutMePage/AboutMePage';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import HomePage from '../pages/HomePage/HomePage';
import VacancyView from '../pages/VacancyView/VacancyView';

const App:React.FC = () => {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/vacancy' replace />} />
        <Route path='/vacancy' element={<HomePage />} />
        <Route path='/vacancy/:area' element={<HomePage/>}/>
        <Route path='/vacancy/:id' element={<VacancyView />} />
        <Route path='/about' element={<AboutMePage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App;
