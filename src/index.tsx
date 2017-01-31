import * as React from "react";
import * as ReactDOM from "react-dom";

import { ChartContainer } from "./components/ChartContainer";

ReactDOM.render(
    <ChartContainer compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);