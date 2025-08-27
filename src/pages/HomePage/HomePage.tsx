import Header from '../../components/Heder/Header';
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import Options from '../../components/Options/Options';
import VacancyList from '../../features/vacancies/VacancyList/VacancyList';
import { Pagination } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { setPage } from '../../features/vacancies/VacanciesSlice/VacanciesSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, pages } = useSelector((state: RootState) => state.vacancies);

  const currentPageHuman = page + 1;

  return (
    <>
      <Header />
      <HeaderMain />
      <div className='main-container'>
        <Options />
        <VacancyList />
      </div>
      {pages > 1 && (
        <div className='pagination-container'>
        <Pagination
          total={pages}
          value={currentPageHuman}
          onChange={(p) => dispatch(setPage(p - 1))}
          size="xl"
          radius="sm"
          siblings={1}
          withEdges={true}
        />
        </div>
      )}
    </>
  );
};

export default HomePage; 