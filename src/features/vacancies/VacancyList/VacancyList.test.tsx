import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../../test/test-utils';
import VacancyList from './VacancyList';

// Mock the API
vi.mock('../../../api/hhApi', () => ({
  hhApi: {
    getVacancies: vi.fn(),
  },
}));

const mockVacancy = {
  id: '1',
  name: 'Frontend Developer',
  area: {
    id: '1',
    name: 'Москва',
  },
  salary: {
    from: 100000,
    to: 150000,
    currency: 'RUR',
    gross: true,
  },
  schedule: {
    id: 'fullDay',
    name: 'Полный день',
  },
  employer: {
    id: '1',
    name: 'Test Company',
  },
  experience: {
    id: 'between1And3',
    name: 'От 1 года до 3 лет',
  },
  employment: {
    id: 'full',
    name: 'Полная занятость',
  },
  alternate_url: 'https://example.com',
  published_at: '2024-01-01T00:00:00Z',
};

describe('VacancyList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state', () => {
    render(<VacancyList />, {
      preloadedState: {
        vacancies: {
          loading: true,
          items: [],
          page: 0,
          pages: 0,
          per_page: 10,
          found: 0,
          area: undefined,
          searchText: '',
          searchField: '',
          skills: [],
          error: null,
        },
      },
    });

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('shows empty state when no search and no results', () => {
    render(<VacancyList />, {
      preloadedState: {
        vacancies: {
          loading: false,
          items: [],
          page: 0,
          pages: 0,
          per_page: 10,
          found: 0,
          area: undefined,
          searchText: '',
          searchField: '',
          skills: ['TypeScript', 'React', 'Redux'],
          error: null,
        },
      },
    });

    expect(screen.getByText(/По навыкам/)).toBeInTheDocument();
  });

  it('shows search empty state when search has no results', () => {
    render(<VacancyList />, {
      preloadedState: {
        vacancies: {
          loading: false,
          items: [],
          page: 0,
          pages: 0,
          per_page: 10,
          found: 0,
          area: undefined,
          searchText: 'NonExistentJob',
          searchField: 'name',
          skills: [],
          error: null,
        },
      },
    });

    expect(screen.getByText(/По запросу "NonExistentJob" ничего не найдено/)).toBeInTheDocument();
  });

  it('renders vacancy cards when data is available', () => {
    render(<VacancyList />, {
      preloadedState: {
        vacancies: {
          loading: false,
          items: [mockVacancy],
          page: 0,
          pages: 1,
          per_page: 10,
          found: 1,
          area: undefined,
          searchText: '',
          searchField: '',
          skills: [],
          error: null,
        },
      },
    });

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();
  });
}); 