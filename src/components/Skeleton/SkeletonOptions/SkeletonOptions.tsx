import style from './SkeletonOptions.module.scss';
import BtnCloseIcon from '../../../assets/BtnCloseIcon.svg';


interface SkeletonOptionsProps {
  children: string;
  onRemove?: () => void;
}

const SkeletonOptions = ({ children, onRemove }: SkeletonOptionsProps ) => {
  return (
    <div className={style.snippet}>
      <span className={style.text}>{children}</span>
      <button
        type="button"
        className={style.btnClose}
        aria-label="Удалить навык"
        onClick={onRemove}
      >
        <img src={BtnCloseIcon} />
      </button>
    </div>
  );
};

export default SkeletonOptions;