import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const myWs = new WebSocket('ws://localhost:9000');
  myWs.onopen = function () {
    console.log('Connected sussessfully');
  };

  const [currency, setCurrency] = useState({})
  const [webHookState, setWebHookState] = useState('Start')
  const [isEnabledClass, setIsEnabledClass] = useState('show')
  const [isDisabledClass, setIsDisabledClass] = useState('hide')
  const [mainText, setMainText] = useState('Currency')

  myWs.onmessage = function (message) {
    const res = JSON.parse(message.data);
    setCurrency(res)
    console.log(res);
  };

  function sendRequest() {
    if(webHookState === 'Start'){
      myWs.send('sendRequest');
      setWebHookState('Stop')
      setIsEnabledClass('hide')
      setIsDisabledClass('show')
      setMainText('Actual currency')
    }
    else if(webHookState === 'Stop'){
      setWebHookState('Start')
      setIsEnabledClass('show')
      setIsDisabledClass('hide')
      setMainText('Currency')
    }
  }

  return (
    <div className="App">
      <div>
        <button className="fancy" onClick={sendRequest}>
          <span className="top-key"></span>
          <span className="text">{webHookState} webSocket</span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </button>
      </div>
      <div>
        <h1>{mainText}</h1>
        <p className={isEnabledClass + " textRed"}> • WebSocked is disabled</p>
        <p className={isDisabledClass + " textGreen"}> • WebSocked is enlabed</p>
      </div>

      <div>
        <table className="table">
          <tbody>
            <tr className="tableHead">
              <th>currencyCodeA</th>
              <th>currencyCodeB</th>
              <th>date</th>
              <th>rateBuy</th>
              <th>rateCross</th>
              <th>rateSell</th>
            </tr>
            {currency.length > 0 ? (
              currency.map((item, index) =>
                <tr key={index.toString()}>
                  <td>{item.currencyCodeA}</td>
                  <td>{item.currencyCodeB}</td>
                  <td>{item.date}</td>
                  <td>{item.rateBuy}</td>
                  <td>{item.rateCross}</td>
                  <td>{item.rateSell}</td>
                </tr>
              )
            ) : (
              <tr><td colspan="6">Press "Start websocket" for getting currecny</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

