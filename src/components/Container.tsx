import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Mix } from "./Mix";
import { BarExample } from "./Bar";
import { LineExample } from "./Line";
import { FileImport } from "./FileImport";
import { MonthAverage } from "./MonthAverage";
import { AllMonths } from "./AllMonths";
import { MonthHist } from "./Hist";

// import { Map } from "./Map";

const enum Tabs {
    FileImport = 0,
    Mix,
    LineExample,
    BarExample,
    MonthAverage,
    AllMonths,
    MonthHist,
    Map
}

interface IContainerState {
    activeTab?: Tabs;
}

export class Container extends React.Component<IContainerState, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: Tabs.FileImport
        }
    }

    onTabSelected(ev: any, tab: Tabs) {
        this.setState({
            activeTab: tab
        });
    }

    renderTabs() {
        return <ul className="tab">
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.FileImport ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.FileImport)}>FILE IMPORT</a></li>
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.Mix ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.Mix)}>MIX</a></li>
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.LineExample ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.LineExample)}>LINE</a></li>
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.BarExample ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.BarExample)}>BAR</a></li>
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.MonthAverage ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.MonthAverage)}>MONTH AVERAGE</a></li>
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.AllMonths ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.AllMonths)}>ALL MONTHS</a></li>
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.MonthHist ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.MonthHist)}>MONTHS HIST</a></li>
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.Map ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.Map)}>MAP</a></li>
        </ul>;
    }

    renderContent() {
        const { activeTab } = this.state;
        switch (activeTab) {
            case Tabs.FileImport:
                return <FileImport />;
            case Tabs.Mix:
                return <Mix />;
            case Tabs.LineExample:
                return <LineExample />;
            case Tabs.BarExample:
                return <BarExample />;
            case Tabs.MonthAverage:
                return <MonthAverage />;
            case Tabs.AllMonths:
                return <AllMonths />;
            case Tabs.MonthHist:
                return <MonthHist />;
            case Tabs.Map:
                document.getElementById('googleMap').style.display = 'block';
                return null;
            default:
                return <FileImport />;
        }
    }

    render() {
        return (
            <div>
                {this.renderTabs()}
                {this.renderContent()}
            </div>
        );
    }
};