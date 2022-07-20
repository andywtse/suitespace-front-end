
import { useEffect } from 'react'
import './weather.css'

const WeatherDisplay = ({weather,weatherDisplay}) => {

  useEffect(()=>{

  })

  return (
    <>
      <div className='weather-display-container divide-y'>

        {/* Body content of card */}
        <div className='weather-content'>
          <img src={weather.current?.condition.icon} alt=""/>
          <h2>{weather.current?.condition.text}</h2>
          <h1>{weather.current?.temp_f}<span>&#176;</span></h1>
        </div>

        {/* Data info */}
        <div className='weather-data'>
          <div className='weather-data-item'>
            <h4>Last Updated</h4>
            {weather.current?.last_updated.slice(10,16)}
          </div>
          <div className='weather-data-item'>
            <h4>Humidity</h4>
            {weather.current?.humidity}
          </div>
          <div className='weather-data-item'>
            <h4>UV</h4>
            {weather.current?.uv}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherDisplay;