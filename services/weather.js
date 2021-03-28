import http from '../http';

export const getWarsawWeather = async () => {
  try {
    const response = await getWeather(523920);

    return response;
  } catch (e) {
    throw new Error("Can't get weather");
  }
};

export const getWeather = (locationId) => {
  return http.get(`/weather/${locationId}/`);
};
