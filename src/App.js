import React from 'react'
import './App.scss';
import map from './assets/map.png'
import Panel from './components/Panel/Panel'
import Clock from './components/clock/Clock'

//-- API's
//-- https://www.beliefmedia.com.au/australian-postal-codes
//-- http://worldtimeapi.org/

function App() {

  return (
    <div className="App">
      <div className="app__content">
          <Panel />
          <div className="map__container">
            <img src={map} alt="map" className="map" />
            <Clock />
          </div>
          
      </div>
      
    </div>
  );
}

export default App;
