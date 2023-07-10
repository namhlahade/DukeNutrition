import React from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import {Chart} from 'react-chartjs-2';

import {DropDownComponent} from '../dropdown.component';
import * as Utils from './utils';
import "../../../css/chart.css"

ChartJS.register(...registerables);

let start = new Date(),
  end = new Date();

start.setDate(start.getDate() - 7); // set to 'now' minus 7 days.
start.setHours(0, 0, 0, 0); // set to midnight.

const options = {
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          min: start,
          max: end,
          unit: "day",
        },
      },
    ],
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Actual',
      data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Goal',
      data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderDash: [10,5]
    },
  ],
};

export function LineChart() {
  return (
    <div>
      <Chart
        type="line"
        options={options}
        data={data}
      />
      <br />
      <div id="dropDownContainer">
        <DropDownComponent title = {"Time Period"} menuItems={[7, 30, 180, 365]}/>
        <DropDownComponent title = {"Macro"} menuItems={["Calories", "Carbs", "Protein", "Fat"]}/>
      </div>
    </div>
  );  
}
