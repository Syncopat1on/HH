import { useSelector, useDispatch} from "react-redux";
import { useEffect } from 'react';
import VacancyCard from '../VacancyCard/VacancyCard';
import { fetchVacancies } from '../../vacancies/VacanciesSlice/VacanciesSlice';
import { AppDispatch, RootState } from "../../../app/store";
import style from './VacancyList.module.scss';


const VacancyList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: vacancies, page, area, searchText, loading, skills } = useSelector((state:RootState) => state.vacancies);

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch, page, area, searchText, skills]);

  if(loading) {
    return (
      <div className={style.loading}>Загрузка...</div>
    )
  }

  if (!loading && vacancies.length === 0) {
    if (searchText) {
      return (
        <div className={style.NotFoundVacancy}>
          {`По запросу "${searchText}" ничего не найдено`}
        </div>
      );
    } else {
      return (
        <div className={style.NotFoundVacancy}>
          {`По навыкам "${skills}" ничего не найдено`}
        </div>
      );
    }
  }

  return (
    <div className={style.vacancyContainer}>
      {vacancies.map((vacancy) => 
      <VacancyCard key={vacancy.id} vacancy={vacancy}/>
      )}
    </div>
  )
}

export default VacancyList;