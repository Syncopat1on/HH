import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import Options from './Options';

// Mock the API
vi.mock('../../api/hhApi', () => ({
  hhApi: {
    getVacancies: vi.fn(),
  },
}));

describe('Options Component', () => {
  it('renders with initial skills', () => {
    render(<Options />);
    
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
  });

  it('allows adding new skills', async () => {
    const user = userEvent.setup();
    const { store } = render(<Options />);
    
    const input = screen.getByPlaceholderText('Навык');
    const addButton = screen.getByRole('button', { name: '' });
    
    await user.type(input, 'JavaScript');
    await user.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });
    
    const state = store.getState();
    expect(state.vacancies.skills).toContain('JavaScript');
  });

  it('prevents adding duplicate skills', async () => {
    const user = userEvent.setup();
    render(<Options />);
    
    const input = screen.getByPlaceholderText('Навык');
    const addButton = screen.getByRole('button', { name: '' });
    
    await user.type(input, 'React');
    await user.click(addButton);
    
    // React should still appear only once
    const reactElements = screen.getAllByText('React');
    expect(reactElements).toHaveLength(1);
  });

  it('allows removing skills', async () => {
    const user = userEvent.setup();
    const { store } = render(<Options />);
    
    const removeButtons = screen.getAllByLabelText('Удалить навык');
    await user.click(removeButtons[0]); // Remove first skill
    
    await waitFor(() => {
      expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
    });
    
    const state = store.getState();
    expect(state.vacancies.skills).not.toContain('TypeScript');
  });

  it('handles city selection', async () => {
    const user = userEvent.setup();
    const { store } = render(<Options />);
    
    const citySelect = screen.getByRole('combobox');
    await user.selectOptions(citySelect, 'Москва');
    
    const state = store.getState();
    expect(state.vacancies.area).toBe(1);
  });

  it('clears input after adding skill', async () => {
    const user = userEvent.setup();
    render(<Options />);
    
    const input = screen.getByPlaceholderText('Навык') as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: '' });
    
    await user.type(input, 'Vue');
    await user.click(addButton);
    
    expect(input.value).toBe('');
  });

  it('handles Enter key to add skill', async () => {
    const user = userEvent.setup();
    const { store } = render(<Options />);
    
    const input = screen.getByPlaceholderText('Навык');
    await user.type(input, 'Angular{enter}');
    
    await waitFor(() => {
      expect(screen.getByText('Angular')).toBeInTheDocument();
    });
    
    const state = store.getState();
    expect(state.vacancies.skills).toContain('Angular');
  });
}); 