import type { VacanciesResponse, Vacancy, SearchParams } from '../type/type';

const BASE_URL = 'https://api.hh.ru';

export const hhApi = {
  async getVacancies(params: SearchParams = {}): Promise<VacanciesResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(params).forEach(key => {
        const value = params[key as keyof SearchParams];
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`${BASE_URL}/vacancies?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: VacanciesResponse = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error fetching vacancies:', error);
      throw error;
    }
  },

  async getVacancyById(id: string): Promise<Vacancy> {
    try {
      const response = await fetch(`${BASE_URL}/vacancies/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Vacancy = await response.json();
      
      return data;
    } catch (error) {
      console.error('Error fetching vacancy:', error);
      throw error;
    }
  }
};