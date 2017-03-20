import React = require('react');
// import * as _ from 'lodash';
import { Bar } from 'react-chartjs-2';
import { IWorkSheet, } from "xlsx";
import * as XLSX from 'ts-xlsx';

interface IMonthHistState {
    dict?: { [key: string]: number; };
    histData?: Array<any>;
    selectedMonth?: number;
}

export class MonthHist extends React.Component<any, IMonthHistState>{
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
        let histData = Array<any>();
        let tempData: { [key: string]: number; } = {};

        for (let key in dict) {
            let date = new Date(key);

            if (date.getUTCMonth() !== selectedMonth) {
                continue;
            }

            if (dict[key] < 100) {
                if (tempData["0-100"] === undefined) {
                    tempData["0-100"] = 1;
                } else {
                    tempData["0-100"]++;
                }                
            } else if (dict[key] >= 100 && dict[key] < 200) {
                if (tempData["100-200"] === undefined) {
                    tempData["100-200"] = 1;
                } else {
                    tempData["100-200"]++;
                }                
            } else if (dict[key] >= 200 && dict[key] < 300) {
                if (tempData["200-300"] === undefined) {
                    tempData["200-300"] = 1;
                } else {
                    tempData["200-300"]++;
                }                
            } else if (dict[key] >= 300 && dict[key] < 400) {
                if (tempData["300-400"] === undefined) {
                    tempData["300-400"] = 1;
                } else {
                    tempData["300-400"]++;
                }                
            } else if (dict[key] >= 400 && dict[key] < 500) {
                if (tempData["400-500"] === undefined) {
                    tempData["400-500"] = 1;
                } else {
                    tempData["400-500"]++;
                }                
            } else if (dict[key] >= 500 && dict[key] < 600) {
                if (tempData["500-600"] === undefined) {
                    tempData["500-600"] = 1;
                } else {
                    tempData["500-600"]++;
                }                
            } else if (dict[key] >= 600 && dict[key] < 700) {
                if (tempData["600-700"] === undefined) {
                    tempData["600-700"] = 1;
                } else {
                    tempData["600-700"]++;
                }                
            } else if (dict[key] >= 700 && dict[key] < 800) {
                if (tempData["700-800"] === undefined) {
                    tempData["700-800"] = 1;
                } else {
                    tempData["700-800"]++;
                }                
            } else if (dict[key] >= 800 && dict[key] < 900) {
                if (tempData["800-900"] === undefined) {
                    tempData["800-900"] = 1;
                } else {
                    tempData["800-900"]++;
                }                
            } else if (dict[key] > 900) {
                if (tempData[">900"] === undefined) {
                    tempData[">900"] = 1;
                } else {
                    tempData[">900"]++;
                }                
            }
        }

        Object.keys(tempData).sort().forEach(key => {
            histData.push({ Level: key, Hist: tempData[key] });
        });

        this.setState({
            histData,
            dict,
            selectedMonth
        })
    }

    render() {
        if (!this.state || !this.state.dict) {
            return null;
        }

        const { histData, selectedMonth } = this.state;

        const months = ["January", "April", "July", "October"];

        const data = {
            labels: histData.map(d => { return d.Level }),
            datasets: [
                {
                    label: 'Excel data',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: histData.map(d => { return d.Hist })
                }
            ]
        };

        return (
            <div>
                <span>Choose month:</span>
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