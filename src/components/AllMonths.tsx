import React = require('react');
// import * as _ from 'lodash';
import { Bar } from 'react-chartjs-2';
import { IWorkSheet, } from "xlsx";
import * as XLSX from 'ts-xlsx';

function addZero(i: number) {
    if (i < 10) {
        return "0" + i;
    }
    return i;
}

interface IAllMonthsState {
    dict?: { [key: string]: number; };
    dayData?: { [key: string]: Array<any>; };
}

export class AllMonths extends React.Component<any, IAllMonthsState>{
    readFile(file: string) {
        return new Promise((resolve, reject) => {
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
                        let wb: XLSX.IWorkBook = XLSX.read(bstr, { type: 'binary' });
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

    getMonthNameByIndex(index: number) {
        switch (index) {
            case 0:
                return "January";
            case 3:
                return "April";
            case 6:
                return "July";
            case 9:
                return "October";
            default:
                return "January";
        }
    }

    processColumn(dict: { [key: string]: number; }, workSheet: XLSX.IWorkSheet, columnDateName: string, columnValueName: string) {
        let index = 3;

        while (true) {
            let time = new Date(workSheet[columnDateName + index].w)
            let value = Number(workSheet[columnValueName + index].v);

            dict[time.toUTCString()] = value;

            index++;
            if (!workSheet[columnDateName + index]) {
                break;
            }
        }
    }

    componentDidMount() {
        this.readFile("Irradiation_2016.xlsx").then((file: XLSX.IWorkBook) => {
            let workSheet: XLSX.IWorkSheet = file.Sheets[file.SheetNames[0]];
            let dict: { [key: string]: number; } = {};

            this.processColumn(dict, workSheet, "A", "B");
            this.processColumn(dict, workSheet, "D", "E");
            this.processColumn(dict, workSheet, "G", "H");
            this.processColumn(dict, workSheet, "J", "K");

            let dayData = {
                "Jan": new Array<any>(),
                "Apr": new Array<any>(),
                "Jul": new Array<any>(),
                "Oct": new Array<any>()
            };

            let p1 = new Promise((resolve) => this.processMonth(dict, 0, dayData["Jan"], resolve));
            let p2 = new Promise((resolve) => this.processMonth(dict, 3, dayData["Apr"], resolve));
            let p3 = new Promise((resolve) => this.processMonth(dict, 6, dayData["Jul"], resolve));
            let p4 = new Promise((resolve) => this.processMonth(dict, 9, dayData["Oct"], resolve));

            Promise.all([p1, p2, p3, p4]).then(values => {
                this.setState({
                    dict,
                    dayData
                });
            });
        })
    }

    processMonth(dict: any, selectedMonth: number, dayData: Array<any>, resolve: any) {
        let tempData: { [key: string]: number[]; } = {};

        for (let key in dict) {
            let date = new Date(key);

            if (date.getUTCMonth() !== selectedMonth) {
                continue;
            }

            let time = addZero(date.getHours()) + ":" + addZero(date.getMinutes());
            if (tempData[time]) {
                tempData[time].push(dict[key]);
            } else {
                tempData[time] = new Array<number>();
                tempData[time].push(dict[key]);
            }
        }

        let firstData = Object.keys(tempData).sort()[0];
        let lastData = Object.keys(tempData).sort()[Object.keys(tempData).length - 1];
        Object.keys(tempData).sort().forEach(key => {
            let averageForDate = 0;

            tempData[key].forEach(d => {
                averageForDate += d;
            });
            averageForDate = averageForDate / tempData[key].length;

            dayData.push({ Date: key, Value: averageForDate });
        });

        let lowerBorder = new Number(firstData.substr(0, 2)).valueOf() * 2;
        if (firstData.substr(3,1) === "3") {
            lowerBorder++;
        }

        for (let i = lowerBorder - 1; i >= 0; i--) {
            let tempTime = addZero(Math.floor(i / 2)) + ":" + (i % 2 === 0 ? "00" : "30");
            dayData.unshift({ Date: tempTime, Value: 0 })
        }

        let upperBorder = new Number(lastData.substr(0, 2)).valueOf() * 2;
        if (lastData.substr(3,1) === "3") {
            upperBorder++;
        }

        for (let i = upperBorder + 1; i < 48; i++) {
            let tempTime = addZero(Math.floor(i / 2)) + ":" + (i % 2 === 0 ? "00" : "30");
            dayData.push({ Date: tempTime, Value: 0 })
        }

        resolve(dayData);
    }

    render() {
        if (!this.state || !this.state.dict) {
            return null;
        }

        const { dayData } = this.state;

        const data = {
            labels: dayData["Jul"].map(d => { return d.Date }),
            datasets: [
                {
                    label: 'January',
                    type: 'line',
                    data: dayData["Jan"].map(d => { return d.Value }),
                    fill: false,
                    borderColor: '#c10000',
                    backgroundColor: '#c10000',
                    pointBorderColor: '#c10000',
                    pointBackgroundColor: '#c10000',
                    pointHoverBackgroundColor: '#c10000',
                    pointHoverBorderColor: '#c10000'
                },
                {
                    label: 'April',
                    type: 'line',
                    data: dayData["Apr"].map(d => { return d.Value }),
                    fill: false,
                    borderColor: '#2c6ec7',
                    backgroundColor: '#2c6ec7',
                    pointBorderColor: '#2c6ec7',
                    pointBackgroundColor: '#2c6ec7',
                    pointHoverBackgroundColor: '#2c6ec7',
                    pointHoverBorderColor: '#2c6ec7'
                },
                {
                    label: 'July',
                    type: 'line',
                    data: dayData["Jul"].map(d => { return d.Value }),
                    fill: false,
                    borderColor: '#00A651',
                    backgroundColor: '#00A651',
                    pointBorderColor: '#00A651',
                    pointBackgroundColor: '#00A651',
                    pointHoverBackgroundColor: '#00A651',
                    pointHoverBorderColor: '#00A651'
                },
                {
                    label: 'October',
                    type: 'line',
                    data: dayData["Oct"].map(d => { return d.Value }),
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,1)',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(75,192,192,1)'
                }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "All Months"
            },
            tooltips: {
                mode: 'label'
            },
            elements: {
                line: {
                    fill: false
                }
            }
        };

        return (
            <div>
                <div style={{ display: "block", width: "100%", height: "300px" }}>
                    <Bar
                        data={data}
                        width={100}
                        height={300}
                        options={options}
                    />
                </div>
            </div>
        );
    }
};