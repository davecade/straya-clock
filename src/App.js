import React, { useEffect } from 'react'
import './App.scss';
import map from './assets/map.png'
import Panel from './components/Panel/Panel'
import Clock from './components/clock/Clock'
import { connect } from 'react-redux';
import { fetchMapDataStart, updateSelected } from './Redux/map/map.actions'

//-- API's
//-- https://www.beliefmedia.com.au/australian-postal-codes
//-- http://worldtimeapi.org/

function App({ fetchMapDataStart, selected, updateSelected }) {

  useEffect(() => {
    if(selected===null) updateSelected('NSW')
    let startInterval = setInterval(() => fetchMapDataStart(), 1000);
    return () => clearInterval(startInterval)
  }, [fetchMapDataStart, selected, updateSelected])

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

const mapStateToProps = state => ({
  selected: state.map.selected,
})

const mapDispatchToProps = dispatch => ({
  fetchMapDataStart: () => dispatch(fetchMapDataStart()),
  updateSelected: stateName => dispatch(updateSelected(stateName))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
