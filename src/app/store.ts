import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from '../features/vacancies/VacanciesSlice/VacanciesSlice';

export const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;