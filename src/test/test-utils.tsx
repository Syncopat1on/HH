/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from '../features/vacancies/VacanciesSlice/VacanciesSlice';
import { ReactElement } from 'react';

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      vacancies: vacanciesReducer,
    },
    preloadedState,
  });
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any;
  route?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ children, store }: { children: React.ReactNode; store: any; route?: string }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    route = '/',
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const store = createTestStore(preloadedState);
  
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllTheProviders store={store} route={route}>
      {children}
    </AllTheProviders>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render, createTestStore }; 