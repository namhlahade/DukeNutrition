import React, { useState } from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import {Chart} from 'react-chartjs-2';
import { useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { AuthenticationController } from '../../controller/AuthenticationController';
import { useAuth } from '../../context/AuthProvider';
import { Button } from 'react-bootstrap';
import * as Utils from './utils';
import "../../../css/chart.css"

ChartJS.register(...registerables);

export const PieChart = () => {
  const [pieData, setPieData] = useState({});
  const [pieColors, setPieColors] = useState([]);
  const authenticationController = new AuthenticationController();
  const cookies = useAuth().cookies;

  function generateRandomColors(fetchedData) {
    const colorKeys = Object.keys(Utils.CHART_COLORS);
    let currentIndex = 0;
  
    return Object.keys(fetchedData).map(() => {
      const colorIndex = currentIndex % colorKeys.length;
      currentIndex++;
  
      return Utils.transparentize(Utils.CHART_COLORS[colorKeys[colorIndex]], 0.5);
    });
  }

  const fetchPieData = async () => {
    const userid = await authenticationController.getUserId(cookies).then((userId) => {return userId});
  
    try {
      const response = await fetch('http://127.0.0.1:5000/dashboard/getPieChartData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userid }),
      });
  
      const fetchedData = await response.json();
      setPieData(fetchedData);
      setPieColors(generateRandomColors(fetchedData));

    } catch (error) {
      console.log('Error: ', error);
    }
  };


  useEffect(() => {
    fetchPieData();
  }, []);

  const chartLabels = Object.keys(pieData).map(key => key.replace(/_/g, ' '));


  return (
    <div id='chart-id' >
      <Chart id='pieChart' type="pie" data={
      {
        labels: chartLabels,
        datasets: [
          {
            data: Object.values(pieData), 
            backgroundColor: pieColors, 
            borderColor: pieColors,
          },
        ],
      }
    } />

    </div>
  );  
}

