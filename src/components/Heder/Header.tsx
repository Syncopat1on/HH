import style from './Header.module.scss';
import AvatarLogo from '../../assets/AvatarLogo.svg';
import HHLogo from '../../assets/HHLogo.png';
import { NavLink } from 'react-router-dom';
import CustomLink from '../CustomLink/CustomLink';

const Header = () => {
  return (
    <div className={style.headerContainer}>
      <div className={style.logo}>
        <img className={style.logoImage} src={HHLogo}/>
        <div className={style.logoName}>.FrontEnd</div>
      </div>
      <div className={style.navGroup}>
        <CustomLink className={style.opening} to={'/vacancy'}>
          Вакансии FE
          {/* <div className={style.openingPoint}></div> */}
        </CustomLink>
        <div className={style.AM}>
          <img className={style.AMImage} src={AvatarLogo}/>
          <CustomLink className={style.AMName} to={'/about'}>Обо мне</CustomLink>
        </div>
      </div>
    </div>
  );
};

export default Header;