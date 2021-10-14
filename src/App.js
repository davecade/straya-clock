import './App.scss';
import map from './assets/map.png'

//-- API's
//-- https://www.beliefmedia.com.au/australian-postal-codes
//-- http://worldtimeapi.org/

function App() {
  return (
    <div className="App">
      <div className="app__content">
          <div className="panel"></div>
          <div className="map__container">
            <img src={map} alt="map" className="map" />
            <div className="WA">WA</div>
          </div>
          
      </div>
      
    </div>
  );
}

export default App;
