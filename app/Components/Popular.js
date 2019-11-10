import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

function LanguagesNav({selectedLanguage, updateLanguage}) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'PHP'];
    return (
        <ul className='flex-center'>
            {languages.map((language) => (
                <li key={language}>
                    <button 
                        style={ language === selectedLanguage ? {color:'rgb(187, 46, 31)'} : null} 
                        className='btn-clear nav-link'
                        onClick={() => updateLanguage(language)}
                        >
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    );
}

LanguagesNav.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    updateLanguage: PropTypes.func.isRequired
};

class Popular extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            error: null,
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(selectedLanguage){
        this.setState({
            selectedLanguage: selectedLanguage,
            error: null,
            repos: null
        });
        fetchPopularRepos(selectedLanguage)
            .then((repos) => this.setState({
                repos: repos,
                error: null
            }))
            .catch(() => {
                console.warn('Error fetching repos: ', error);
                this.setState({
                    error: `There was an error fetching the repositories.`
                });
            })
            ;
    }

    isLoading(){
        return this.state.error === null && this.state.repos === null;
    }
    
    render(){
        const {selectedLanguage, repos, error} = this.state;
        return (
        <React.Fragment>
        <LanguagesNav 
            selectedLanguage={selectedLanguage}
            updateLanguage={this.updateLanguage}    
        />
        {this.isLoading() && <p>LOADING..</p>}
        {error && <p>{error}</p>}
        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
        </React.Fragment>);
    }
}

export default Popular;