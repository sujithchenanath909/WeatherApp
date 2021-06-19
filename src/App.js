import React, { useState } from 'react';

const api={

  key:'b6d5de82040a490b9c2132136211906',
  base:'https://api.weatherapi.com/v1/current.json?'

}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {


      fetch(`${api.base}key=${api.key}&q=${query}&aqi=no`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
         
         

        }).catch(error => console.error(error));
    }
  }

  const test=()=>{
    console.log('name',weather.location.name);
    console.log('county',weather.location.country);
         console.log('temperature',weather.current.temp_c);
         console.log(weather.current.condition.text)
  }

  const onSearchChange = (event) =>{
    //console.log(event.target.value)
    setQuery(event.target.value);
  }

const dateBuilder=(d)=>{

  let months=["january","Februvary","March","April","May","June","July",
  "August","September","October","November","December"];
  let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  let day=days[d.getDay()];
  let month=months[d.getMonth()];
  let date=d.getDate();
  let year=d.getFullYear();

  let res=day + ' '+ month +' '+date +' '+year;

  return res;
}


return (
<div className={(typeof weather.current != "undefined") ? ((weather.current.temp_c > 16) ? 'app warm' : 'app') : 'app'}>
<main>
  <div className="search-box">
    <input 
      type="text"
      className="search-bar"
      placeholder="Search..."
      onChange={ onSearchChange }
      value={query}
      onKeyPress={search}
    />
  </div>
  {(typeof weather.location != "undefined") && (typeof weather.current != "undefined") ? (
  <div>
    <div className="location-box">
      <div className="location">{weather.location.name}, {weather.location.country}</div>
      <div className="date">{dateBuilder(new Date())}</div>
    </div>
    <div className="weather-box">
      <div className="temp">
        {Math.round(weather.current.temp_c)}°c
      </div>
      <div className="weather">{weather.current.condition.text}</div>
    </div>
  </div>
  ) : ('')}
</main>
</div>
);

}

export default App;
