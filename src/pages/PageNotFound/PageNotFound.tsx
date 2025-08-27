import style from './PageNotFound.module.scss';
import Header from '../../components/Heder/Header';
import CryingCat from '../../assets/CryingCat.gif';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <Header />
      <div className={style.PageNotFoundContainer}>
        <div className={style.PageNotFoundContent}>
          <div className={style.PageNotFoundTitleContainer}>
            <div className={style.PageNotFoundTitleContainer}>
              <div className={style.PageNotFoundTitle}>Упс! Такой страницы<br/> не существует</div>
              <Link className={style.PageNotFoundToHomeBtn} to='/vacancy'>На главную</Link>
            </div>
            <div className={style.PageNotFoundBottomText}>Давайте перейдём к началу.</div>
          </div>
          <img  className={style.CryingCat} src={CryingCat}/>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;