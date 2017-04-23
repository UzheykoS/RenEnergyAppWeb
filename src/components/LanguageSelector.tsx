import * as React from 'react'
import * as ReactDOM from 'react-dom'

const Languages  = [ "ENG", "UKR" ];

interface ILanguageSelectorProps {
    onLanguageChanged: (lang: string) => void;
}

interface ILanguageSelectorState {
    selectedLanguage?: string;
}

export class LanguageSelector extends React.Component<ILanguageSelectorProps, ILanguageSelectorState>{
    constructor(props: any) {
        super(props);
        this.state = {
            selectedLanguage: Languages[0]
        }
    }

    onLanguageSelected = (ev: any) => {
        this.setState({
            selectedLanguage: ev.target.value
        });

        if (this.props.onLanguageChanged) {
            this.props.onLanguageChanged(ev.target.value);
        }
    }

    render() {
        const { selectedLanguage } = this.state;

        return (
            <div>
                <select onChange={this.onLanguageSelected} value={Languages.find(l => l == selectedLanguage)}>
                    {Languages.map((l, i) => {
                        return <option key={i}>{l}</option>;
                    })}
                </select>
            </div>
        );
    }
};