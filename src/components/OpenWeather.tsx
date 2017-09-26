import React = require('react');
import ReactDOM = require('react-dom');
import { Doughnut, Line } from 'react-chartjs-2';
import Helper, { CurrentWeather, WeatherForecast } from "../utils/helper";
import { Busy } from "altareturn-ui-controls";

const rawData: Array<any> = JSON.parse(require("../jsondata.json"));
const insolation = rawData[6];
const insLabels = rawData[7];

interface IOpenWeatherState {
    current: CurrentWeather;
    forecast: WeatherForecast;
}
export class OpenWeather extends React.Component<any, IOpenWeatherState>{
    constructor(props) {
        super(props);
        this.state = {
            current: null,
            forecast: null
        }
    }

    async componentDidMount() {
        const current: CurrentWeather = await Helper.getCurrentWeather(703448);
        const forecast: WeatherForecast = await Helper.getForecastWeather(703448);
        this.setState({
            current,
            forecast
        });
    }

    render() {
        const { forecast, current } = this.state;

        if (!forecast) {
            return <Busy isVisible={true} />;
        }

        const windData = {
            labels: forecast.list.map(w => { return Helper.formatUnixDate(w.dt) }),
            datasets: [
                {
                    label: 'Wind Speed Data',
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
                    data: forecast.list.map(w => {
                        return w.wind.speed
                    })
                }
            ]
        };

        const cloudData = {
            labels: forecast.list.map(w => { return Helper.formatUnixDate(w.dt) }),
            datasets: [
                {
                    label: 'Cloud Index Data',
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
                    data: forecast.list.map(w => {
                        return w.clouds.all
                    })
                }
            ]
        };

        const tempData = {
            labels: forecast.list.map(w => { return Helper.formatUnixDate(w.dt) }),
            datasets: [
                {
                    label: 'Temperature Data',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#2c6ec7',
                    borderColor: '#2c6ec7',
                    borderCapStyle: 'butt',
                    borderDash: new Array<any>(),
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#2c6ec7',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#2c6ec7',
                    pointHoverBorderColor: '#2c6ec7',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: forecast.list.map(w => {
                        return w.main.temp
                    })
                }
            ]
        };

        const humidityData = {
            labels: forecast.list.map(w => { return Helper.formatUnixDate(w.dt) }),
            datasets: [
                {
                    label: 'Humidity Data',
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
                    data: forecast.list.map(w => {
                        return w.main.humidity
                    })
                }
            ]
        };

        const insCalc = insolation.map((i, index) => {
            const label = insLabels[index];
            const hour = label.split(':')[0];
            const cloudAndTime = forecast.list.
                filter(d => Helper.getDateFromUnixDate(d.dt).getDate() == (new Date()).getDate() + 4).
                map(w => {
                    return { Cloud: w.clouds.all, Time: Helper.getDateFromUnixDate(w.dt) };
                })
            const filteredCoefs = cloudAndTime.filter(x => x.Time.getHours() <= hour);
            const k = filteredCoefs[filteredCoefs.length - 1].Cloud;
            return i * (100 - k) / 100;
        });

        const insolationData = {
            labels: insLabels,
            datasets: [
                {
                    label: 'Solar Insolation Data Calculated',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#c10000',
                    borderColor: '#c10000',
                    borderCapStyle: 'butt',
                    borderDash: new Array<any>(),
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#c10000',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#c10000',
                    pointHoverBorderColor: '#c10000',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: insCalc
                },
                {
                    label: 'Solar Insolation Data Raw',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#71B37C',
                    borderColor: '#71B37C',
                    borderCapStyle: 'butt',
                    borderDash: new Array<any>(),
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#71B37C',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#71B37C',
                    pointHoverBorderColor: '#71B37C',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: insolation
                }
            ]
        };

        return (
            <div>
                <Line data={insolationData} />
                <h2>Current weather for {current.name}</h2>
                <h3>clouds: {current.clouds.all} %</h3>
                <h3>wind speed: {current.wind.speed} m/s</h3>
                <h3>temparature: {current.main.temp} C</h3>
                <h3>humidity: {current.main.humidity} %</h3>
                <Line data={windData} />
                <Line data={cloudData} />
                <Line data={tempData} />
                <Line data={humidityData} />
            </div>
        );
    }
};