"use strict"
declare var require: any;
import React = require('react');
import ReactDOM = require('react-dom');
import { Doughnut, Line } from 'react-chartjs-2';

var rawData: Array<any> = JSON.parse(require("../../jsondata.json"));

const data0 = {
    labels: rawData[4].map((d: any) => { return d.toString()}), 
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
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
            data: rawData[4]
        }
    ]
};

var spline = require('cubic-spline');
 
var xs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]; 
var ys = rawData[0];

let processedData = [];
// interpolate a line at a higher resolution 
for(var i = 0; i < 270; i++) {
    processedData.push(spline(i*.1, xs, ys));
}

const data = {
    labels: processedData.map(d => { return d.toString()}), 
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
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
            data: processedData
        }
    ]
};

var getCurvePoints = require("cardinal-spline-js").getCurvePoints;
var outPoints: Array<any> = getCurvePoints(rawData[0], 0.1, 25);

const data2 = {
    labels: outPoints.map(d => { return d.toString()}), 
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
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
            data: outPoints
        }
    ]
};

export class LineExample extends React.Component<any, undefined>{

    render() {
        return (
            <div>
                <h2>Line Example 0</h2>
                <Line data={data0} />
                <h2>Line Example</h2>
                <Line data={data} />
                <h2>Line Example 2</h2>
                <Line data={data2} />
            </div>
        );
    }
};