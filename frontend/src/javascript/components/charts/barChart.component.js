import React from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import {Chart} from 'react-chartjs-2';

import {DropDownComponent} from '../dropdown.component';
import * as Utils from './utils';
import { Button } from 'react-bootstrap';
import { getElement } from 'survey-core';
import { useEffect, useState } from 'react';
import '../../../css/chart.css'

ChartJS.register(...registerables);

const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const actions = [
  {
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
      });
      chart.update();
    }
  },
  {
    name: 'Add Dataset',
    handler(chart) {
      const data = chart.data;
      const dsColor = Utils.namedColor(chart.data.datasets.length);
      const newDataset = {
        label: 'Dataset ' + (data.datasets.length + 1),
        backgroundColor: Utils.transparentize(dsColor, 0.5),
        borderColor: dsColor,
        borderWidth: 1,
        data: Utils.numbers({count: data.labels.length, min: -100, max: 100}),
      };
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  {
    name: 'Add Data',
    handler(chart) {
      const data = chart.data;
      if (data.datasets.length > 0) {
        data.labels = Utils.months({count: data.labels.length + 1});

        for (let index = 0; index < data.datasets.length; ++index) {
          data.datasets[index].data.push(Utils.rand(-100, 100));
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
      chart.data.labels.splice(-1, 1); // remove the label first

      chart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });

      chart.update();
    }
  }
];

export const BarChart = () => {

  let calsAndMacs = {};
  let targetCalsAndMacs = {};
  const [calsAndMacsKeys, setCalsAndMacsKeys] = useState([]);
  const [calsAndMacsValues, setCalsAndMacsValues] = useState([]);
  const [targetCalsAndMacsValues, setTargetCalsAndMacs] = useState([]);

  const fetchActualWeeklyMacros = async () => {
    const userid = "86a75215-6fb8-4d9e-8d89-960a71288ff6";
  
    try {
      const response = await fetch('http://127.0.0.1:5000/dashboard/thisWeeksStats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userid }),
      });
  
      calsAndMacs = await response.json();
      setCalsAndMacsKeys(Object.keys(calsAndMacs));
      setCalsAndMacsValues(Object.values(calsAndMacs));
      console.log(calsAndMacs);
      console.log(calsAndMacsKeys);
      console.log(calsAndMacsValues);
    } catch (error) {
      console.log('Error: ', error);
    }
  };


  const fetchTargetWeeklyMacros = async () => {
    const userid = "86a75215-6fb8-4d9e-8d89-960a71288ff6";
  
    try {
      const response = await fetch('http://127.0.0.1:5000/dashboard/thisWeeksTargets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userid }),
      });
  
      targetCalsAndMacs = await response.json();
      setTargetCalsAndMacs(Object.values(targetCalsAndMacs));
    } catch (error) {
      console.log('Error: ', error);
    }
  };


  useEffect(() => {
    fetchActualWeeklyMacros();
  }, []);

  useEffect(() => {
    fetchTargetWeeklyMacros();
  }, []);

  const barChart = true ? (
    <Chart
      type="bar"
      config={{
          type: 'bar',
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Bar Chart'
              }
            }
          },
        }}
      data = {{
        labels: calsAndMacsKeys,
        datasets: [
          {
            label: 'Daily Average (Past 7 Days)',
            data: calsAndMacsValues,
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          },
          {
            label: 'Daily Goal',
            data: targetCalsAndMacsValues,
            borderColor: Utils.CHART_COLORS.blue,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
          }
        ]
      }}
    />
  ) : null;
  // call fetchBarStats() here before exporting BarChart()

  return (
    <div id='chart-id'>
      {barChart}
      <br />
      <div id={'chart-actions-row'}>
        {/* {actions?.map((action, index) => (
          <Button id='chart-action' key={index} onClick={() => action.handler(document.getElementById('barChart'))}>
            {action.name}
          </Button>
        ))} */}
      </ div>
    </div>
  );  
};


// https://www.chartjs.org/docs/latest/samples/bar/vertical.html

