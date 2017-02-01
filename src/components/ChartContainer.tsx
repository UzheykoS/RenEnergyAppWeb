import * as React from "react";
import * as Chart from '../../node_modules/chart.js/src/chart.js'
//let myChart = new Chart({...})

export interface ChartContainerProps { compiler: string; framework: string; }

export class ChartContainer extends React.Component<ChartContainerProps, undefined> {
    render() {
        return <h1>
            Hello from me to {this.props.compiler} and {this.props.framework}!!!
        </h1>;
    }
}