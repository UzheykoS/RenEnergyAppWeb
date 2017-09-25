import React = require('react');
import { Bar } from 'react-chartjs-2';

var rawData: Array<any> = JSON.parse(require("../../jsondata.json"));

var getCurvePoints = require("cardinal-spline-js").getCurvePoints;
var outPoints: Array<any> = getCurvePoints(rawData[0], 1, 1);
var outPoints1: Array<any> = getCurvePoints(rawData[0], 0.1, 5);

var spline = require('cubic-spline');

var xs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
var ys = rawData[0];

let processedData = [];
// interpolate a line at a higher resolution 
for (var i = 0; i < 270; i++) {
  processedData.push(spline(i * .1, xs, ys));
}

let fakeProcessedData = [];
// interpolate a line at a higher resolution 
for (var i = 0; i < 270; i++) {
  if (i == 0 || i % 10 == 0) {
    fakeProcessedData.push(processedData[i]);
  }
}

const data = {
  labels: xs,
  datasets: [
  {
    label: 'Line insolation raw',
    type: 'line',
    data: rawData[0],
    fill: false,
    borderColor: '#2c6ec7',
    backgroundColor: '#2c6ec7',
    pointBorderColor: '#2c6ec7',
    pointBackgroundColor: '#2c6ec7',
    pointHoverBackgroundColor: '#2c6ec7',
    pointHoverBorderColor: '#2c6ec7',
    yAxisID: 'y-axis-1'
  },
  {
    label: 'Raw data',
    fill: false,
    type: 'line',
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: new Array<any>(),
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: rawData[0],
    yAxisID: 'y-axis-1'
  },
  {
    type: 'bar',
    label: 'Bar insolation',
    data: rawData[0],
    fill: false,
    backgroundColor: '#71B37C',
    borderColor: '#71B37C',
    hoverBackgroundColor: '#71B37C',
    hoverBorderColor: '#71B37C',
    yAxisID: 'y-axis-1'
  }]
};

const options = {
  responsive: true,
  title: {
    display: true,
    text: "Chart.js Bar Chart - Multi Axis"
  },
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    xAxes: [
      {
        display: true,
        position: "bottom",
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }      
      }
    ]
  }
};

export class Mix extends React.Component<any, any>{

  render() {
    return (
      <div>
        <h2>Mix Example Test</h2>
        <Bar
          data={data as any}
          options={options}
        />
      </div>
    );
  }
};