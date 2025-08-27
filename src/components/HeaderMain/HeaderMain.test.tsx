import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import HeaderMain from './HeaderMain';

// Mock the API
vi.mock('../../api/hhApi', () => ({
  hhApi: {
    getVacancies: vi.fn(),
  },
}));

describe('HeaderMain Component', () => {
  it('renders search form', () => {
    render(<HeaderMain />);
    
    expect(screen.getByPlaceholderText('Должность или название компании')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Найти' })).toBeInTheDocument();
  });

  it('renders page title', () => {
    render(<HeaderMain />);
    
    expect(screen.getByText('Список вакансий')).toBeInTheDocument();
    expect(screen.getByText('по профессии Frontend-разработчик')).toBeInTheDocument();
  });

  it('handles search submission', async () => {
    const user = userEvent.setup();
    const { store } = render(<HeaderMain />);
    
    const searchInput = screen.getByPlaceholderText('Должность или название компании');
    const searchButton = screen.getByRole('button', { name: 'Найти' });
    
    await user.type(searchInput, 'Frontend Developer');
    await user.click(searchButton);
    
    await waitFor(() => {
      const state = store.getState();
      expect(state.vacancies.searchText).toBe('Frontend Developer');
      expect(state.vacancies.searchField).toBe('name');
    });
  });

  it('handles Enter key for search', async () => {
    const user = userEvent.setup();
    const { store } = render(<HeaderMain />);
    
    const searchInput = screen.getByPlaceholderText('Должность или название компании');
    await user.type(searchInput, 'React Developer{enter}');
    
    await waitFor(() => {
      const state = store.getState();
      expect(state.vacancies.searchText).toBe('React Developer');
    });
  });

  it('prevents form submission with empty search', async () => {
    const user = userEvent.setup();
    const { store } = render(<HeaderMain />);
    
    const searchButton = screen.getByRole('button', { name: 'Найти' });
    await user.click(searchButton);
    
    const state = store.getState();
    expect(state.vacancies.searchText).toBe('');
  });

  it('updates search text as user types', async () => {
    const user = userEvent.setup();
    render(<HeaderMain />);
    
    const searchInput = screen.getByPlaceholderText('Должность или название компании') as HTMLInputElement;
    await user.type(searchInput, 'JavaScript');
    
    expect(searchInput.value).toBe('JavaScript');
  });
}); 