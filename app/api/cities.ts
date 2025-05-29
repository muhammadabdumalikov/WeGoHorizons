import axios from 'axios';

export const fetchTours = async (search?: string) => {
  const url = 'https://api.wetrippo.com/api/tour/list';

  try {
    const response = await axios.post(url,
      {
        offset: 0,
        limit: 10,
        search: search || null,
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

export const fetchOrganizers = async () => {
  const url = 'https://api.wetrippo.com/api/organizer/list';

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
