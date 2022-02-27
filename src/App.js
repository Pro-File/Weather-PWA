import { useState } from "react";
import "./App.css";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import { FetchWeather } from "./Services/FetchWeather";
import { Button } from "@material-ui/core";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [state, setState] = useState({
    open: false,
    message: 'error, please try again!'
  });

  const action = (
    <Button color="primary" size="small" onClick={(e) => setState({
      open: false,
    })}>
      <CloseIcon/>
    </Button>
  );

  const search = async (e) => {
    if (e.key === "Enter") {
      try {
      const data = await FetchWeather(query);
      if (data) {
        console.log(data)
        setWeather(data);
        setQuery("");
      }
     } catch (error) {
      setState({
        open: true,
        message: 'Invalid Location, Please Enter Valid Location!',
      })       
     }
    }
  };

  return (
    <div className="main-container">
       <Snackbar
        open={state.open}
        onClose={(e) => setState({
          open: false,
        })}
        action={action}
        TransitionComponent={Slide}
        message={state.message}
      />
      <input
        type="text"
        className="search"
        placeholder="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">{Math.round(weather.main.temp)}
          <sup>&deg; C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>
              {weather.weather[0].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
