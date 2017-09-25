import axios from 'axios';

class Helper {
    static guid = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    static async executeGetRequest (url: string) {
        let result = await axios.get(url);
        return result;
    }

    static async getCurrentWeather(cityId: number): Promise<CurrentWeather> {
        const result = await this.executeGetRequest(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=b3b3a6dee16384978f2c477a6c99d804&units=metric`);
        return result ? result.data : null;
    }

    static async getForecastWeather(cityId: number): Promise<WeatherForecast> { 
        const result = await this.executeGetRequest(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=b3b3a6dee16384978f2c477a6c99d804&units=metric&lang=ua`);
        return result ? result.data : null;
    }

    static async getHistoryWeather(cityId: string, start: string, end: string) {//703448 1505887200 1506232800
        const result = this.executeGetRequest(`http://history.openweathermap.org/data/2.5/history/city?id=${cityId}&type=hour&start=${start}&end=${end}&appid=b3b3a6dee16384978f2c477a6c99d804`);
        return result;
    }

    static formatUnixDate(ticks: number): string {
        var a = new Date(ticks * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var minutes = "0" + a.getMinutes();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + minutes.substr(-2);
        return time;
    }

    static convertToUnixDate(date: Date): number {
        var unixtime = date.getTime()/1000;
        return unixtime;
    }
}

export default Helper;

export interface CurrentWeather {
    coord: {
        lon: number;
        lat: number;
    };
    weather: [{
        id: number;
        main: string;
        description: string;
        icon: string;
    }];
    base: string;
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        message: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    id: number;
    name: string;
}

export interface WeatherForecast {
    city?: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        },
        country: string;
    };
    list: [{
        dt: number;
        main: {
            temp: number;
            temp_min: number;
            temp_max:number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        },
        weather: [
            {
                id: number;
                main: string;
                description: string;
                icon: string;
            }
        ],
        clouds: {
            all: number;
        },
        wind: {
            speed: number;
            deg: number;
        },
        sys: {
            pod: string;
        },
        dt_txt: string;
    }];
}