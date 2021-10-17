import React, { useEffect } from 'react'
import './App.scss';
import map from './assets/map.png'
import Panel from './components/Panel/Panel'
import Clock from './components/clock/Clock'
import { connect } from 'react-redux';
import { fetchMapDataStart } from './Redux/map/map.actions'

//-- API's
//-- https://www.beliefmedia.com.au/australian-postal-codes
//-- http://worldtimeapi.org/

function App({ fetchMapDataStart }) {

  useEffect(() => {
    //fetchMapDataStart()
    let startInterval = setInterval(() => fetchMapDataStart(), 1000);
    return () => clearInterval(startInterval)
  }, [fetchMapDataStart])

  return (
    <div className="App">
      <div className="app__content">
          <Panel />
          <div className="map__container">
            <img src={map} alt="map" className="map" />
            <Clock className={"WA"} />
            <Clock className={"SA"} />
            <Clock className={"NT"} />
            <Clock className={"QLD"} />
            <Clock className={"NSW"} />
            <Clock className={"VIC"} />
            <Clock className={"TAS"} />
          </div>
          
      </div>
      
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchMapDataStart: () => dispatch(fetchMapDataStart())
})

export default connect(null, mapDispatchToProps)(App);
