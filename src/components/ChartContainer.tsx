import * as React from "react";

export interface ChartContainerProps { compiler: string; framework: string; }

export class ChartContainer extends React.Component<ChartContainerProps, undefined> {
    render() {
        return <h1>Hello from me to {this.props.compiler} and {this.props.framework}!</h1>;
    }
}