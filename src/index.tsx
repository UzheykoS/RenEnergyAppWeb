import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";

require("!style!css!sass!./styles/global.scss");

ReactDOM.render(
    <App />,
    document.getElementById("example")
);