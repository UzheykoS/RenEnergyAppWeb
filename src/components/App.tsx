import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Container } from "./Container";
import { LanguageSelector } from "./LanguageSelector";

interface IAppState {
    language: string;
}

export class App extends React.Component<any, IAppState>{
     constructor(props: any) {
        super(props);
        this.state = {
            language: "ENG"
        }
    }

    onLanguageChanged = (lang: string) => {
        this.setState({
            language: lang
        })
    }

    render() {
        const { language } = this.state;
        
        return (
            <div>
                <LanguageSelector onLanguageChanged={this.onLanguageChanged} />
                <Container language={language}/>
            </div>
        );
    }
};