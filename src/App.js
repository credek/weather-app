import React, { useState } from 'react';
import icon from './img/icon.png';

const api = {
  key: "2c6f68b71747395953c35cce81a9358f",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }
  
  const dateBuilder = (data) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[data.getDay()];
    let date = data.getDate();
    let month = months[data.getMonth()];
    let year = data.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 18) ? 'App warm' : 'App') : 'App warm'}>
      <main>
         <div className="search-box">
           <h1>Weather App <img src={icon} alt="icon" className="icon" /></h1>
           <input type="text" className="search-bar" placeholder="Type city name to check weather, e.g. London" 
           onChange={e => setQuery(e.target.value)}
           value={query}
           onKeyPress={search} />
         </div>
         {(typeof weather.main != "undefined") ? (
         <div>
           <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}          
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
         </div>
         <div className='weather-box'>
           <div className='temperature'>
            {Math.round(weather.main.temp)}°C
           </div>
         <div className='weather'>{weather.weather[0].main}</div>
         </div>
         </div>
         ) : ('')}
      </main>
    </div>
  );
}

export default App;
