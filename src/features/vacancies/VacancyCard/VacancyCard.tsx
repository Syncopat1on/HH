import style from './VacancyCard.module.scss';
import { type Vacancy } from '../../../type/type';
import {Link} from 'react-router-dom';

interface VacancyCardProps {
  vacancy: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  const formatSalary = () => {
    const { salary } = vacancy;
    if (!salary) return 'Зарплата не указана';
  
    const { from, to, currency, gross } = salary;
    const currencySymbols: Record<string, string> = { 
      RUR: '₽',
      USD: '$',
      EUR: '€' 
    };
    const currencyLabel = currencySymbols[currency] || currency;
    const taxInfo = gross ? 'до вычета налогов' : 'на руки';  
  
    if (!from && !to) return null;
  
    const amount = from && to 
      ? `${from.toLocaleString()} – ${to.toLocaleString()}`
      : (from ? from.toLocaleString() : to.toLocaleString());
      return (
        <>
          {amount} {currencyLabel}{', '}
          <span>{taxInfo}</span>
        </>
      );
}

  const experience = vacancy.experience?.name || 'Не указан';

  const scheduleId = vacancy.schedule?.id;
  let workFormat = '';

  if (scheduleId === 'remote') {
    workFormat = 'МОЖНО УДАЛЁННО';
  } else if (scheduleId === 'flexible' || scheduleId === 'flyInFlyOut') {
    workFormat = 'ГИБРИД';
  } else {
    workFormat = 'ОФИС';
  }

  return (
    <div className={style.vacancyContainer}>
      <div className={style.vacancyContent}>
        <div className={style.topContainer}>
          <div className={style.vacancyTittle}>{vacancy.name}</div>
          <div className={style.moneyAndExperienceContainer}>
            <div className={style.vacancyMoney}>{formatSalary()}</div>
            <div className={style.vacancyExperience}>{experience}</div>
          </div>
        </div>
        <div className={style.middleContainer}>
          <div className={style.vacancyCompanyName}>{vacancy.employer.name}</div>
          <div className={`${style.vacancyJobConditions} ${style[scheduleId]}`}>
            {workFormat}
          </div>
          <div className={style.vacancyCity}>{vacancy.area.name}</div>
        </div>

        <div className={style.BtnContainer}>
          <Link className={style.viewVacancy} to={`/vacancy/${vacancy.id}`}>
            Смотреть вакансию
          </Link>
          <a 
            href={vacancy.alternate_url}
            target="_blank"
            rel="noopener noreferrer"
            className={style.respondVacancy}>
              Откликнуться
          </a>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;