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
            <Clock className={"state WA"} city={"Perth"} />
            <Clock className={"state SA"} city={"Adelaide"} />
            <Clock className={"state NT"} city={"Darwin"} />
            <Clock className={"state QLD"} city={"Brisbane"} />
            <Clock className={"state NSW"} city={"Sydney"} />
            <Clock className={"state VIC"} city={"Melbourne"} />
            <Clock className={"state TAS"} city={"Hobart"} />
          </div>
          
      </div>
      
    </div>
  );
}

export default App;
