import { describe, it, expect, vi, beforeEach } from 'vitest';
import vacanciesReducer, { 
  setPage, 
  setArea, 
  setSearchText, 
  setSearchField, 
  addSkill, 
  removeSkill,
  fetchVacancies 
} from './VacanciesSlice';
import { VacanciesState } from './VacanciesSlice';

// Mock the API
vi.mock('../../../api/hhApi', () => ({
  hhApi: {
    getVacancies: vi.fn(),
  },
}));

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

describe('Vacancies Slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Reducers', () => {
    it('should handle initial state', () => {
      expect(vacanciesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setPage', () => {
      const actual = vacanciesReducer(initialState, setPage(2));
      expect(actual.page).toEqual(2);
    });

    it('should handle setArea and reset page', () => {
      const stateWithPage = { ...initialState, page: 5 };
      const actual = vacanciesReducer(stateWithPage, setArea(1));
      expect(actual.area).toEqual(1);
      expect(actual.page).toEqual(0);
    });

    it('should handle setSearchText and reset page', () => {
      const stateWithPage = { ...initialState, page: 3 };
      const actual = vacanciesReducer(stateWithPage, setSearchText('React'));
      expect(actual.searchText).toEqual('React');
      expect(actual.page).toEqual(0);
    });

    it('should handle setSearchField and reset page', () => {
      const stateWithPage = { ...initialState, page: 1 };
      const actual = vacanciesReducer(stateWithPage, setSearchField('name'));
      expect(actual.searchField).toEqual('name');
      expect(actual.page).toEqual(0);
    });

    it('should handle addSkill', () => {
      const actual = vacanciesReducer(initialState, addSkill('Vue'));
      expect(actual.skills).toContain('Vue');
      expect(actual.page).toEqual(0);
    });

    it('should not add duplicate skills', () => {
      const actual = vacanciesReducer(initialState, addSkill('React'));
      expect(actual.skills.filter(s => s === 'React')).toHaveLength(1);
    });

    it('should not add empty skills', () => {
      const actual = vacanciesReducer(initialState, addSkill(''));
      expect(actual.skills).toEqual(initialState.skills);
    });

    it('should handle removeSkill', () => {
      const actual = vacanciesReducer(initialState, removeSkill('React'));
      expect(actual.skills).not.toContain('React');
      expect(actual.page).toEqual(0);
    });

    it('should handle removeSkill for non-existent skill', () => {
      const actual = vacanciesReducer(initialState, removeSkill('NonExistent'));
      expect(actual.skills).toEqual(initialState.skills);
    });
  });

  describe('Async Thunks', () => {
    it('should handle fetchVacancies.pending', () => {
      const actual = vacanciesReducer(initialState, fetchVacancies.pending);
      expect(actual.loading).toEqual(true);
      expect(actual.error).toEqual(null);
    });

    it('should handle fetchVacancies.fulfilled', () => {
      const mockResponse = {
        items: [{ id: '1', name: 'Test Job' }],
        found: 1,
        pages: 1,
        page: 0,
        per_page: 10,
      };

      const actual = vacanciesReducer(
        { ...initialState, loading: true },
        fetchVacancies.fulfilled(mockResponse, '')
      );

      expect(actual.loading).toEqual(false);
      expect(actual.items).toEqual(mockResponse.items);
      expect(actual.found).toEqual(mockResponse.found);
      expect(actual.pages).toEqual(mockResponse.pages);
    });

    it('should handle fetchVacancies.rejected', () => {
      const errorMessage = 'Network error';
      const actual = vacanciesReducer(
        { ...initialState, loading: true },
        fetchVacancies.rejected(new Error(errorMessage), '', undefined, errorMessage)
      );

      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(errorMessage);
    });
  });

  describe('State Management', () => {
    it('should maintain skills array integrity', () => {
      let state = vacanciesReducer(initialState, addSkill('Vue'));
      state = vacanciesReducer(state, addSkill('Angular'));
      state = vacanciesReducer(state, removeSkill('React'));
      
      expect(state.skills).toContain('TypeScript');
      expect(state.skills).toContain('Redux');
      expect(state.skills).toContain('Vue');
      expect(state.skills).toContain('Angular');
      expect(state.skills).not.toContain('React');
    });

    it('should reset page when search parameters change', () => {
      let state = { ...initialState, page: 5 };
      
      state = vacanciesReducer(state, setSearchText('New Search'));
      expect(state.page).toEqual(0);
      
      state = { ...state, page: 3 };
      state = vacanciesReducer(state, setArea(2));
      expect(state.page).toEqual(0);
      
      state = { ...state, page: 2 };
      state = vacanciesReducer(state, addSkill('NewSkill'));
      expect(state.page).toEqual(0);
    });
  });
}); 