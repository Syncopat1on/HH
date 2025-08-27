import style from './Options.module.scss';
import BtnPlusIcon from '../../assets/BtnPlusIcon.svg';
import SkeletonOptions from "../Skeleton/SkeletonOptions/SkeletonOptions";
import { useState, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArea, addSkill as addSkillAction, removeSkill as removeSkillAction } from '../../features/vacancies/VacanciesSlice/VacanciesSlice';
import { AppDispatch, RootState } from '../../app/store';

const Options = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentArea = useSelector((state: RootState) => state.vacancies.area);
  const skills = useSelector((state: RootState) => state.vacancies.skills);

  const [skillInput, setSkillInput] = useState<string>("");

  const addSkill = (value: string) => {
    const normalized = value.trim();
    if (!normalized) return;
    dispatch(addSkillAction(normalized));
    setSkillInput("");
  };

  const removeSkill = (value: string) => {
    dispatch(removeSkillAction(value));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addSkill(skillInput);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const onCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const areaId = value === '' ? undefined : value === 'Москва' ? 1 : value === 'Санкт-Петербург' ? 2 : undefined;
    dispatch(setArea(areaId as any));
  };

  const cityValue = currentArea === 1 ? 'Москва' : currentArea === 2 ? 'Санкт-Петербург' : '';

  return (
    <div className={style.ContainerALL}>
    <div className={style.optionsContainer}>
      <div className={style.optionsContent}>
        <div className={style.optionsAddSnippetContainer}>
          <form className={style.optionsForm} onSubmit={onSubmit}>
            <label className={style.labelText}>Ключевые навыки</label>
            <div className={style.inputContainer}>
              <input
                className={style.addSnippetInput}
                placeholder='Навык'
                value={skillInput}
                onChange={onInputChange}
                onKeyDown={onInputKeyDown}
              />
              <button className={style.addSnippetBtn} type="submit"><img src={BtnPlusIcon}/></button>
            </div>
          </form>
          <div className={style.snippetContainer}>
            {skills.map((item, index) => (
              <SkeletonOptions key={index} onRemove={() => removeSkill(item)}>{item}</SkeletonOptions>
            ))}
          </div>
        </div>
      </div>
    </div>
       
      <div className={style.sityChoise}>
          <select className={style.choiseSityInput} value={cityValue} onChange={onCityChange}>
            <option value=''>Все города</option>
            <option value='Москва'>Москва</option>
            <option value='Санкт-Петербург'>Санкт-Петербург</option>
          </select>
      </div>

    </div>
  );
};

export default Options;