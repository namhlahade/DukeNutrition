import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DropDownComponent from './dropdown.component';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    x: {
        type: 'timeseries',
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
let start = new Date(),
  end = new Date();

start.setDate(start.getDate() - 7); // set to 'now' minus 7 days.
start.setHours(0, 0, 0, 0); // set to midnight.

export function LineChart() {
  return (
    <div>
      <br/>
      <DropDownComponent />
      <br/>
      <Line
        options={{
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
        }}
        data={data}
      />
    </div>
  );  
}