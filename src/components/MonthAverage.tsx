import React = require('react');
// import * as _ from 'lodash';
import { Bar } from 'react-chartjs-2';
import { IWorkSheet, } from "xlsx";
import * as XLSX from 'ts-xlsx';

interface IMonthAverageProps {
    language: string;
}

interface IMonthAverageState {
    dict?: { [key: string]: number; };
    dayData?: Array<any>;
    selectedMonth?: number;
}

export class MonthAverage extends React.Component<IMonthAverageProps, IMonthAverageState>{
    constructor(props: any) {
        super(props);
        this.state = {
            selectedMonth: 0
        }
    }

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

    onMonthSelected = (ev: any) => {
        const { dict } = this.state;
        let monthIndex = 0;
        const monthName = ev.target.value;
        if (monthName === "April") {
            monthIndex = 3;
        } else if (monthName === "July") {
            monthIndex = 6;
        } else if (monthName === "October") {
            monthIndex = 9;
        }
        this.processMonth(dict, monthIndex);
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

            this.processMonth(dict, 0);
        })
    }

    addZero(i: number) {
        if (i < 10) {
            return "0" + i;
        }
        return i;
    }

    processMonth(dict: any, selectedMonth: number) {
        let dayData = Array<any>();
        let tempData: { [key: string]: number[]; } = {};

        for (let key in dict) {
            let date = new Date(key);

            if (date.getUTCMonth() !== selectedMonth) {
                continue;
            }

            let time = this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes());
            if (tempData[time]) {
                tempData[time].push(dict[key]);
            } else {
                tempData[time] = new Array<number>();
                tempData[time].push(dict[key]);
            }
        }

        Object.keys(tempData).sort().forEach(key => {
            let averageForDate = 0;

            tempData[key].forEach(d => {
                averageForDate += d;
            });
            averageForDate = averageForDate / tempData[key].length;

            dayData.push({ Date: key, Value: averageForDate });
        });

        this.setState({
            dayData,
            dict,
            selectedMonth
        })
    }

    render() {
        if (!this.state || !this.state.dict) {
            return null;
        }

        const { dayData, selectedMonth } = this.state;
        const { language } = this.props;
        
        const months = ["January", "April", "July", "October"];

        const data = {
            labels: dayData.map(d => { return d.Date }),
            datasets: [
                {
                    label: language == "ENG" ? "Excel data" : "Дані Excel:",
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: dayData.map(d => { return d.Value })
                }
            ]
        };

        return (
            <div>
                <span>{language == "ENG" ? "Choose month:" : "Оберіть місяць:"}</span>
                <select onChange={this.onMonthSelected} value={this.getMonthNameByIndex(selectedMonth)}>
                    {months.map((m, i) => {
                        return <option key={i}>{m}</option>;
                    })}
                </select>

                <div style={{ display: "block" }}>
                    <Bar
                        data={data}
                        width={100}
                        height={300}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
            </div>
        );
    }
};