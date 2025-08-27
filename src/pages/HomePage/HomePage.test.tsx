import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import HomePage from './HomePage';

// Mock the API
vi.mock('../../api/hhApi', () => ({
  hhApi: {
    getVacancies: vi.fn(),
  },
}));

describe('HomePage Component', () => {
  it('renders all main components', () => {
    render(<HomePage />);
    
    // Check for header components
    expect(screen.getByText('Список вакансий')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Должность или название компании')).toBeInTheDocument();
    
    // Check for options component
    expect(screen.getByText('Ключевые навыки')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
  });

  it('shows pagination when there are multiple pages', () => {
    render(<HomePage />, {
      preloadedState: {
        vacancies: {
          loading: false,
          items: [],
          page: 0,
          pages: 5,
          per_page: 10,
          found: 50,
          area: undefined,
          searchText: '',
          searchField: '',
          skills: [],
          error: null,
        },
      },
    });

    // Pagination should be visible when pages > 1
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('hides pagination when there is only one page', () => {
    render(<HomePage />, {
      preloadedState: {
        vacancies: {
          loading: false,
          items: [],
          page: 0,
          pages: 1,
          per_page: 10,
          found: 5,
          area: undefined,
          searchText: '',
          searchField: '',
          skills: [],
          error: null,
        },
      },
    });

    // Pagination should not be visible when pages <= 1
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('hides pagination when there are no pages', () => {
    render(<HomePage />, {
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
          skills: [],
          error: null,
        },
      },
    });

    // Pagination should not be visible when pages = 0
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders city selection options', () => {
    render(<HomePage />);
    
    const citySelect = screen.getByRole('combobox');
    expect(citySelect).toBeInTheDocument();
    
    // Check for city options
    expect(screen.getByText('Все города')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();
    expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
  });

  it('renders skills input and add button', () => {
    render(<HomePage />);
    
    expect(screen.getByPlaceholderText('Навык')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();
  });

  it('shows loading state in vacancy list', () => {
    render(<HomePage />, {
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
}); 