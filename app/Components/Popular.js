import React from 'react';

class Popular extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
    }

    updateLanguage(selectedLanguage){
        this.setState({
            selectedLanguage: selectedLanguage
        });
    }
    
    render(){
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'PHP'];
        return (
            <ul className='flex-center'>
                {languages.map((language) => (
                    <li key={language}>
                        <button 
                            style={ language === this.state.selectedLanguage ? {color:'rgb(187, 46, 31)'} : null} 
                            className='btn-clear nav-link'
                            onClick={() => this.updateLanguage(language)}
                            >
                            {language}
                        </button>
                    </li>
                ))}
            </ul>
        );
    }
}

export default Popular;