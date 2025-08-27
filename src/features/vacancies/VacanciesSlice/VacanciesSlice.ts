import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hhApi } from '../../../api/hhApi';
import { Vacancy, VacanciesResponse } from '../../../type/type';
import { RootState } from '../../../app/store';

export interface VacanciesState {
  items: Vacancy[];
  loading: boolean;
  error: string | null;
  page: number;
  pages: number;
  per_page: number;
  found: number;
  area?: number;
  searchText: string;
  searchField: 'name' | 'company_name' | '';
  skills: string[];
}

const initialState: VacanciesState = {
  items: [],
  loading: false,
  error: null,
  page: 0,
  pages: 0,
  per_page: 10,
  found: 0,
  area: undefined,
  searchText: '',
  searchField: '',
  skills: ['TypeScript', 'React', 'Redux'],
};

export const fetchVacancies = createAsyncThunk<VacanciesResponse, void, { state: RootState; rejectValue: string }>(
  'vacancies/fetchVacancies',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { page, per_page, area, searchText, searchField, skills } = getState().vacancies;
      const skillsQuery = skills.length ? skills.join(' ') : '';
      const baseText = searchText || 'frontend';
      const combinedText = [baseText, skillsQuery].filter(Boolean).join(' ').trim();
      const response = await hhApi.getVacancies({
        text: combinedText,
        search_field: searchField || undefined,
        area,
        per_page,
        page,
      } as any);
      return response;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить вакансии');
    }
  }
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload as number;
    },
    setArea(state, action) {
      state.area = action.payload as number | undefined;
      state.page = 0;
    },
    setSearchText(state, action) {
      state.searchText = (action.payload as string) ?? '';
      state.page = 0;
    },
    setSearchField(state, action) {
      state.searchField = (action.payload as 'name' | 'company_name' | '') ?? '';
      state.page = 0;
    },
    addSkill(state, action) {
      const value = String(action.payload ?? '').trim();
      if (!value) return;
      const exists = state.skills.some(s => s.toLowerCase() === value.toLowerCase());
      if (exists) return;
      state.skills.push(value);
      state.page = 0;
    },
    removeSkill(state, action) {
      const value = String(action.payload ?? '');
      state.skills = state.skills.filter(s => s !== value);
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
        state.per_page = action.payload.per_page;
        state.found = action.payload.found;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export const { setPage, setArea, setSearchText, setSearchField, addSkill, removeSkill } = vacanciesSlice.actions;

export default vacanciesSlice.reducer;