import style from './AboutMePage.module.scss';
import Header from '../../components/Heder/Header';

const AboutMePage = () => {
  return (
    <>
     <Header /> 
     <div className={style.aboutMeContainer}>
        <div className={style.aboutMeContent}>
          <div className={style.AMname}>Пластун Ян Александрович</div>
          <div className={style.AMtext}>Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.</div>
        </div>
     </div>
    </>
  );
};

export default AboutMePage;