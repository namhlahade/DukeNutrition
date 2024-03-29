import React, { useEffect } from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import {Chart} from 'react-chartjs-2';
import { AuthenticationController } from '../../controller/AuthenticationController';
import { useAuth } from '../../context/AuthProvider';
import {DropDownComponent} from '../dropdown.component';
import { useState } from 'react';
import * as Utils from './utils';
import "../../../css/chart.css"

export const LineChart = () => {

  ChartJS.register(...registerables);

  const [timePeriod, setTimePeriod] = useState(7);
  const [macro, setMacro] = useState("Calories");
  const [chartData, setChartData] = useState({});
  const authenticationController = new AuthenticationController();
  const cookies = useAuth().cookies;

  let start = new Date(),
    end = new Date();


  const updateTimePeriod = (days) => {
    setTimePeriod(days);
  };

  const updateMacro = (macro) => {
    setMacro(macro);
  };

  const fetchLineChartData = async () => {
    const userid = await authenticationController.getUserId(cookies).then((userId) => {return userId});

    try {
      const response = await fetch('http://127.0.0.1:5000/dashboard/getLineChartData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userid, timePeriod: timePeriod, macro: macro }),
      });
  
      const fetchedData = await response.json();
      setChartData(fetchedData);
      console.log(fetchedData);

    } catch (error) {
      console.log('Error: ', error);
    }

  };

  useEffect(() => {
    fetchLineChartData();
  }, [timePeriod, macro]);

  return (
  <div>
    {chartData.labels && chartData.datasets && (
      <Chart type="line" data={chartData} />
    )}
    <br />
    <div id="dropDownContainer">
      <DropDownComponent
        title="Time Period"
        menuItems={[7, 30, 180, 365]}
        onChange={updateTimePeriod}
      />
      <DropDownComponent
        title="Macro"
        menuItems={["Calories", "Carbs (g)", "Protein (g)", "Fat (g)"]}
        onChange={updateMacro}
      />
    </div>
  </div>

  );  
}
