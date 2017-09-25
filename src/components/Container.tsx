import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Mix } from "./solar/Mix";
import { BarExample } from "./solar/Bar";
import { LineExample } from "./solar/Line";
import { FileImport } from "./solar/FileImport";
import { MonthAverage } from "./solar/MonthAverage";
import { AllMonths } from "./solar/AllMonths";
import { MonthHist } from "./solar/Hist";
import { Map } from "./Map";

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

interface IContainerProps {
    language: string;
}

interface IContainerState {
    activeTab?: Tabs;
}

export class Container extends React.Component<IContainerProps, IContainerState>{
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
        const { language } = this.props;

        return <ul className="tab">
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.FileImport ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.FileImport)}>{language == "ENG" ? "FILE IMPORT" : "ІМПОРТ ФАЙЛУ"}</a></li>
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.Mix ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.Mix)}>{language == "ENG" ? "MIX" : "МІКС"}</a></li>
            {/*<li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.LineExample ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.LineExample)}>{language == "ENG" ? "LINE" : "ЛІНІЙНА"}</a></li>*/}
            {/*<li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.BarExample ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.BarExample)}>{language == "ENG" ? "BAR" : "ГІСТРОГРАМА"}</a></li>*/}
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.MonthAverage ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.MonthAverage)}>{language == "ENG" ? "MONTH AVERAGE" : "СЕРЕДНЄ ЗА МІСЯЦЬ"}</a></li>
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.AllMonths ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.AllMonths)}>{language == "ENG" ? "ALL MONTHS" : "ВСІ МІСЯЦІ"}</a></li>
            <li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.MonthHist ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.MonthHist)}>{language == "ENG" ? "MONTHS HIST" : "МІСЯЧНА ГІСТОГРАМА"}</a></li>
            {/*<li><a href="javascript:void(0)" className={"tablinks " + (this.state.activeTab == Tabs.Map ? "active" : "")} onClick={ev => this.onTabSelected(ev, Tabs.Map)}>{language == "ENG" ? "MAP" : "МАПА"}</a></li>*/}
        </ul>;
    }

    renderContent() {
        const { activeTab } = this.state;
        switch (activeTab) {
            case Tabs.FileImport:
                return <FileImport {...this.props}/>;
            case Tabs.Mix:
                return <Mix {...this.props}/>;
            case Tabs.LineExample:
                return <LineExample {...this.props}/>;
            case Tabs.BarExample:
                return <BarExample {...this.props}/>;
            case Tabs.MonthAverage:
                return <MonthAverage {...this.props}/>;
            case Tabs.AllMonths:
                return <AllMonths {...this.props}/>;
            case Tabs.MonthHist:
                return <MonthHist {...this.props}/>;
            case Tabs.Map:
                document.getElementById('googleMap').style.display = 'block';
                return null;
            default:
                return <FileImport {...this.props}/>;
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