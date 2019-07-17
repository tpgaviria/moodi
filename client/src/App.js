import React from 'react';
import Logo from './components/Logo';
import WeatherWidget from './components/WeatherWidget';
import SpotifyButton from './components/SpotifyButton';
import LIFXButton from './components/LIFXButton';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Logo />
        <WeatherWidget />
        <SpotifyButton />
        <LIFXButton />
      </div>
    </div>
  );
}

export default App;
