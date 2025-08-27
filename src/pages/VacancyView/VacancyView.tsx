import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './VacancyView.module.scss';
import Header from '../../components/Heder/Header';
import VacancyCard from '../../features/vacancies/VacancyCard/VacancyCard';
import { Vacancy } from '../../type/type';
import { hhApi } from '../../api/hhApi';

const VacancyView = () => {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);

  useEffect(() => {
    const fetchVacancy = async () => {
      if (!id) return;
      try {
        const vacancyData = await hhApi.getVacancyById(id);
        setVacancy(vacancyData);
      } catch (err) {
        console.error('Error fetching vacancy:', err);
      }
    };

    fetchVacancy();
  }, [id]);

  if (!vacancy) {
    return (
      <>
        <Header />
        <div className={style.VacancyViewContainer}>
          <div className={style.loading}>Загрузка...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={style.VacancyViewContainer}>
        <VacancyCard vacancy={vacancy} />
        <div className={style.VacancyViewCompany}>
          <div className={style.VacancyViewCompanyContent}>
            {vacancy.description ? (
              <div>
                <h3>Описание вакансии:</h3>
                <div dangerouslySetInnerHTML={{ __html: vacancy.description }} />
              </div>
            ) : (
              <div>Описание вакансии недоступно</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VacancyView;