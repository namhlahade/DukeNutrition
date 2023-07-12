import React from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import {Chart} from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { DropDownComponent } from '../dropdown.component';

import { Button } from 'react-bootstrap';
import * as Utils from './utils';
import "../../../css/chart.css"

ChartJS.register(...registerables);

export const ScatterChart = () => {

  const DATA_COUNT = 7;
  const NUMBER_CFG = {count: DATA_COUNT, rmin: 1, rmax: 1, min: 0, max: 100};

  let scatterData = {};
  const [datasets, setDatasets] = useState([]);
  const [macroX, setMacroX] = useState("Calories");
  const [macroY, setMacroY] = useState("Fat (g)");
  const [data, setData] = useState({});

  function selectedMacro(macronutrientX, macronutrientY, mealData) {
    const scatterData = [];
  
    Object.keys(mealData).forEach((mealId) => {
      const meal = mealData[mealId];
      const xValue = meal[macronutrientX];
      const yValue = meal[macronutrientY];
  
      scatterData.push({ x: xValue, y: yValue, r: 1 });
    });
  
    return scatterData;
  }

  const handleMacroXChange = (newMacroX) => {
    // Update macroX state
    setMacroX(newMacroX);
  
    // Update scatterplot data based on the newMacroX value
    const updatedDatasets = datasets.map((dataset) => {
      const label = dataset.label.replace(/ /g, '_');
      const updatedData = selectedMacro(newMacroX.toLowerCase().split(' ')[0], macroY.toLowerCase().split(' ')[0], data[label] || {});
      return { ...dataset, data: updatedData };
    });
  
    setDatasets(updatedDatasets);
  };
  const handleMacroYChange = (newMacroY) => {
    // Update macroX state
    setMacroY(newMacroY);
  
    // Update scatterplot data based on the newMacroX value
    console.log(datasets);
    const updatedDatasets = datasets.map((dataset) => {
      const label = dataset.label.replace(/ /g, '_');
      const updatedData = selectedMacro(macroX.toLowerCase().split(' ')[0], newMacroY.toLowerCase().split(' ')[0], data[label] || {});
      console.log(dataset.label);
      return { ...dataset, data: updatedData };
    });
  
    setDatasets(updatedDatasets);
    console.log(datasets);
  };

  const populateScatterData = (scatterData) => {
  
    Object.keys(scatterData).forEach((key, index) => {
      const label = key.replace(/_/g, ' ');
      const existingDatasetIndex = datasets.findIndex(datasett => datasett.label === label);
      if (existingDatasetIndex === -1) {
        console.log(label);
        const dataset = {
          label: label,
          data: selectedMacro(macroX.toLowerCase().split(' ')[0], macroY.toLowerCase().split(' ')[0], scatterData[key]),
          borderColor: Object.keys(Utils.CHART_COLORS)[index],
          backgroundColor: Utils.transparentize(Object.keys(Utils.CHART_COLORS)[index], 0.5),
        };
        setDatasets(prevDatasets => [...prevDatasets, dataset]);
      }
    });
  };
  
  
  const fetchScatterData = async () => {
    const userid = "86a75215-6fb8-4d9e-8d89-960a71288ff6";
  
    try {
      const response = await fetch('http://127.0.0.1:5000/dashboard/getScatterPlotData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userid }),
      });
  
      scatterData = await response.json();
      console.log(scatterData);
      console.log(Utils.bubbles(NUMBER_CFG));
      populateScatterData(scatterData);
      setData(scatterData);

    } catch (error) {
      console.log('Error: ', error);
    }
  };



  useEffect(() => {
    fetchScatterData();
  }, []);


  const scatterChart =(
    <Chart
      type="scatter"
      config={{
          type: 'scatter',
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
        }}
        data = {{
          datasets: datasets
        }}
    />
  );
  // call fetchBarStats() here before exporting BarChart()

  return (
    <div id='chart-id'>
      {scatterChart}
      <br />
      <div id="dropDownContainer">
        <DropDownComponent title = {"X-Axis Macro"} menuItems={["Calories", "Carbs (g)", "Protein (g)", "Fat (g)"]} onChange={handleMacroXChange}/>
        <DropDownComponent title = {"Y-Axis Macro"} menuItems={["Fat (g)", "Protein (g)", "Carbs (g)", "Calories"]} onChange={handleMacroYChange}/>
      </div>
    </div>
  );  
};
