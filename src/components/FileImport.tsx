import React = require('react');
import { Bar } from 'react-chartjs-2';
import { IWorkSheet, } from "xlsx";
import * as XLSX from 'ts-xlsx';
var rawData: Array<any> = JSON.parse(require("../jsondata.json"))[0];

interface IFileImportState {
  data?: any;
}

export class FileImport extends React.Component<any, IFileImportState>{
  readFile(file: string) {
    return new Promise(function (resolve, reject) {
      let rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, true);
      rawFile.responseType = 'arraybuffer';
      rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            let response = rawFile.response;
            var data = new Uint8Array(response);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            let wb: XLSX.IWorkBook = XLSX.read(bstr, { type: 'binary' });//"B3:B20"
            resolve(wb);
          }
          else {
            reject(Error(rawFile.statusText));
          }
        }
      }

      rawFile.send(null);
    });
  }

  componentDidMount() {
    this.readFile("Irradiation_2016.xlsx").then((file: XLSX.IWorkBook) => {
      let workSheet: XLSX.IWorkSheet = file.Sheets[file.SheetNames[0]];
      let rawData = [];
      for (let i = 3; i <= 20; i++) {
        rawData.push(Number(workSheet["B" + i].v));
      }

      const data = {
        labels: rawData.map(d => { return d.toString() }),
        datasets: [
          {
            label: 'Excel data',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: rawData
          }
        ]
      };

      this.setState({ data: data })
    })
  }
  render() {
    if (!this.state) {
      return null;
    }
    return (
      <div>
        <h2>File import chart example</h2>
        <Bar
          data={this.state.data}
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