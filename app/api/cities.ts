import axios from 'axios';

export const BASE_URL = 'https://api.wetrippo.com/api';

export interface TourFilters {
  search?: string;
  from_date?: string;
  to_date?: string;
  from_price?: number;
  to_price?: number;
  languages?: string[];
  activities?: string[];
  gender?: string;
  sort_by?: string;
}

export const fetchTours = async (filters?: TourFilters) => {
  const url = `${BASE_URL}/tour/list`;
  console.log('Fetching tours with filters:', filters);

  try {
    const requestBody: any = {
      offset: 0,
      limit: 10,
      search: filters?.search || null,
    };

    // Add date range if provided
    if (filters?.from_date) {
      requestBody.from_date = filters.from_date;
    }
    if (filters?.to_date) {
      requestBody.to_date = filters.to_date;
    }

    // Add price range if provided
    if (filters?.from_price !== undefined) {
      requestBody.from_price = filters.from_price;
    }
    if (filters?.to_price !== undefined) {
      requestBody.to_price = filters.to_price;
    }

    // Add languages if provided
    if (filters?.languages && filters.languages.length > 0) {
      requestBody.languages = filters.languages;
    }

    // Add activities if provided
    if (filters?.activities && filters.activities.length > 0) {
      requestBody.activities = filters.activities;
    }

    // Add gender if provided
    if (filters?.gender) {
      requestBody.gender = filters.gender;
    }

    // Add sorting if provided
    if (filters?.sort_by) {
      requestBody.sort_by = filters.sort_by;
    }

    console.log(requestBody);
    const response = await axios.post(url, requestBody, {
      headers: setHeaders(),
    });

    return response.data?.data || response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
};

export const fetchOrganizers = async () => {
  const url = `${BASE_URL}/organizer/list`;

  try {
    const response = await axios.post(url,
      {
        offset: 0,
        limit: 10,
      },
      {
        headers: setHeaders(),
      }
    );

    return response.data?.data || response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
};

export const fetchCurrentWeather = async (lat: number, lang: number) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=407534e110aa4e0a95b75611251602&q=${lat},${lang}&aqi=no`;
  console.log(1111, url);
  
  try {
    const response = await axios.get(url,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data?.data || response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
};

function setHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-Lang': 'uz',
  };
}
