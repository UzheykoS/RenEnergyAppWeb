import React = require('react');
import { Bar } from 'react-chartjs-2';

var rawData: Array<any> = JSON.parse(require("../jsondata.json"))[0];

function calcPolygonArea(vertices: any) {
  var total = 0;

  for (var i = 0, l = vertices.length; i < l; i++) {
    var addX = vertices[i].x;
    var addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
    var subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
    var subY = vertices[i].y;

    total += (addX * addY * 0.5);
    total -= (subX * subY * 0.5);
  }

  return Math.abs(total);
}
let areaData = rawData.map((d, i) => {
  return { x: i, y: d };
})
//calcPolygonArea(areaData);

var getCurvePoints = require("cardinal-spline-js").getCurvePoints;
var outPoints: Array<any> = getCurvePoints(rawData, 1, 1);

const data = {
  labels: outPoints.map(d => { return d.toString()}),
  datasets: [
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: outPoints
    }
  ]
};

export class BarExample extends React.Component<any, any>{

    render() {
    return (
      <div>
        <h2>Bar Example (custom size)</h2>
        <Bar
          data={data}
          width={100}
          height={300}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
};