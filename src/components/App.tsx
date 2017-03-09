import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Mix } from "./Mix";
import { BarExample } from "./Bar";
import { LineExample } from "./Line";
import { FileImport } from "./FileImport";

export class App extends React.Component<any, any>{

    render() {
        return (
            <div>
                <FileImport />
                <Mix />
                <LineExample />
                <BarExample />                
            </div>
        );
    }
};