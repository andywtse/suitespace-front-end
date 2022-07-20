// Components
import WeatherDisplay from '../../components/Weather/WeatherDisplay'
import WeatherGraph from '../../components/Weather/WeatherGraph'
import WeatherNav from '../../components/Weather/WeatherNav'

// Services
import * as weatherService from '../../services/weatherService'
import * as locationService from '../../services/locationService'

// React
import { useEffect, useState } from 'react'

// CSS
import './weather.css'

const Weather = (props) => {


  const getLocationDetails = async () => {
    try {
      locationService.getLocation()
        .then(location => {
          weatherService.getWeatherDetails(location)
            .then(details => {
              setWeather(details)
            })
        })
    } catch (error) {
      console.log(error)
    }
  }

  const getWeatherDisplayDetails = async () => {
    const weatherDisplayDetail = await weatherService.getWeatherPref()
    setWeatherDisplay(weatherDisplayDetail)
  }

  const [searchLocation, setSearchLocation] = useState(getLocationDetails)
  const [weatherDisplay, setWeatherDisplay] = useState(getWeatherDisplayDetails)
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const fetchWeatherDetails = async () => {
      const weatherDetails =  await weatherService.getWeatherDetails(searchLocation)
      setWeather(weatherDetails)
    }
    fetchWeatherDetails()

  }, [props.user,searchLocation])

  const handleSearchLocation = (formData) => {
    setSearchLocation(formData.query)
  }

  return (
    <>
      <div className='weather-container'>
        <WeatherNav className='weather-nav' weather={weather} handleSearchLocation={handleSearchLocation} />
        <div className='weather-body'>
          <WeatherGraph className='weather-graph' weather={weather} />
          <WeatherDisplay className='weather-display' weather={weather} weatherDisplay={weatherDisplay} />
        </div>
      </div>
    </>
  );
}

export default Weather;