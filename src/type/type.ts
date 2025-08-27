export interface Employer {
  id: string;
  name: string;
  url?: string;
  alternate_url?: string;
}

export interface Vacancy {
  id: string;
  name: string;
  area: {
    id: string;
    name: string;
    url?: string;
  }
  salary: {
    from: number;
    to: number;
    currency: string;
    gross?: boolean;
  }
  schedule: {
    id: string;
    name: string;
  };
  employer: Employer;
  description?: string;
  experience: {
    id: string;
    name: string;
  };
  employment: {
    id: string;
    name: string;
  };
  alternate_url: string;
  published_at: string;
}

export interface VacanciesResponse {
  items: Vacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
  alternate_url: string;
}

export interface SearchParams {
  text?: string;
  industry?: number;
  professional_role?: number;
  area?: number;
  experience?: string;
  employment?: string;
  schedule?: string;
  per_page?: number;
  page?: number;
}


export interface VacanciesState {
  items: Vacancy[];
  currentVacancy: Vacancy | null;
  loading: boolean;
  error: string | null;
  searchParams: SearchParams;
}

export interface VacanciesState {
  items: Vacancy[];
  loading: boolean;
  error: string | null;
  page: number;
  pages: number;
  per_page: number;
  found: number;
  area?: number;
}

// export const AREAS: Record<number, string> = {
//   1: 'Москва',
//   2: 'Санкт-Петербург'
// };
