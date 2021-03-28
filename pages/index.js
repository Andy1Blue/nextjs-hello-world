import * as React from 'react';
import { useEffect, useState } from 'react';
import { getWarsawWeather, getWeather } from '../services/weather';
import { createStore } from 'redux';

const Index = () => {
  const [consolidatedWeathers, setConsolidatedWeathers] = useState([]);

  const getData = async (state, action) => {
    if (action.type === 'WEATHER_WARSAW') {
      const response = await getWarsawWeather();

      return response.data.consolidated_weather;
    }

    return [];
  };

  const store = createStore(getData);

  useEffect(() => {
    const getWeather = () => {
      store.subscribe(async () => {
        const consolidatedWeathersData = await store.getState();
        console.log(consolidatedWeathersData);
        setConsolidatedWeathers(consolidatedWeathersData);
      });
    };
    getWeather();

    store.dispatch({ type: 'WEATHER_WARSAW' });
  }, []);

  return (
    <div>
      <h1>Weather for WARSAW</h1>
      {consolidatedWeathers.map((consolidatedWeather, index) => {
        return (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
            <div>{consolidatedWeather.applicable_date}</div>
            <div>Temperature</div>
            <div>min {Math.round(consolidatedWeather.min_temp)}</div>
            <div>max {Math.round(consolidatedWeather.max_temp)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
