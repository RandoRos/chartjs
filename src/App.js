import './App.css';
import React from 'react';
import 'chartjs-plugin-streaming';
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-zoom';
import * as moment from 'moment';

import MyChart from './Chart';

const preGenData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(
      {
        x: moment().subtract(i, 'minute'),
        y: Math.random()
      }
    );
  }
  return data;
};

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setInterval(() => {
      const newData = data;
      newData.push({
        x: Date.now(),
        y: Math.random(),
      });
      setData(newData);
    }, 2000)
  }, []);

  return (
    <div className="App">
      <MyChart data={data}/>
    </div>
  );
}

export default App;
