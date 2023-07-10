import React from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import {Chart} from 'react-chartjs-2';

import { Button } from 'react-bootstrap';
import * as Utils from './utils';
import "../../../css/chart.css"

ChartJS.register(...registerables);

const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, rmin: 1, rmax: 1, min: 0, max: 100};

const data = {
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.bubbles(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    },
    {
      label: 'Dataset 2',
      data: Utils.bubbles(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.orange,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
    }
  ]
};

const config = {
  type: 'scatter',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Scatter Chart'
      }
    }
  },
};

const actions = [
  {
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = Utils.bubbles({count: DATA_COUNT, rmin: 1, rmax: 1, min: 0, max: 100});
      });
      chart.update();
    }
  },
  {
    name: 'Add Dataset',
    handler(chart) {
      const chartData = chart.data;
      const dsColor = Utils.namedColor(chartData.datasets.length);
      const newDataset = {
        label: 'Dataset ' + (chartData.datasets.length + 1),
        backgroundColor: Utils.transparentize(dsColor, 0.5),
        borderColor: dsColor,
        data: Utils.bubbles({count: DATA_COUNT, rmin: 1, rmax: 1, min: 0, max: 100}),
      };
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  {
    name: 'Add Data',
    handler(chart) {
      const chartData = chart.data;
      if (chartData.datasets.length > 0) {

        for (let index = 0; index < chartData.datasets.length; ++index) {
          chartData.datasets[index].data.push(Utils.bubbles({count: 1, rmin: 1, rmax: 1, min: 0, max: 100})[0]);
        }

        chart.update();
      }
    }
  },
  {
    name: 'Remove Dataset',
    handler(chart) {
      chart.data.datasets.pop();
      chart.update();
    }
  },
  {
    name: 'Remove Data',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });

      chart.update();
    }
  }
];

export function ScatterChart() {
  return (
    <div id='chart-id'>
      <Chart id='scatterChart' type={'scatter'} config={config} data={data} actions={actions} />
      <br />
      <div id='chart-actions-row'>
        {actions?.map((action, index) => (
          <Button id='chart-action' key={index} onClick={() => action.handler(document.getElementById('scatterChart'))}>
            {action.name}
          </Button>
        ))}
      </div>
    </div>
  );  
}


