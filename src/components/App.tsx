import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BarExample } from "./Bar";
import { LineExample } from "./Line";

export class App extends React.Component<any, any>{

    render() {
        return (
            <div>
                <LineExample />
                <BarExample />
            </div>
        );
    }
};