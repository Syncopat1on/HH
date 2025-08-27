import style from './HeaderMain.module.scss';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { setSearchText, setSearchField } from '../../features/vacancies/VacanciesSlice/VacanciesSlice';

const HeaderMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setSearchText(query));
    dispatch(setSearchField('name'));
  };

  return (
    <>
    <div className={style.headerMain}>
      <div className={style.headerContent}>
        <div className={style.ListOfVacanciesContainer}>
          <div className={style.ListOfVacanciesTop}>Список вакансий</div>
          <div className={style.ListOfVacanciesBottom}>по профессии Frontend-разработчик</div>
        </div>
        <div className={style.searchContainer}>
          <form onSubmit={onSubmit}>
            <input 
              className={style.searchInput}
              type='search'
              id='search-input'
              placeholder='Должность или название компании'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className={style.searchBtn} type="submit">Найти</button>
          </form>
        </div>
      </div>
    </div>
    <div className={style.br}/>
    </>
  );
};

export default HeaderMain;