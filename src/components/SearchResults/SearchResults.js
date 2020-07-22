import React from 'react';
import './SearchResults.css';
import {Tracklist} from '../Tracklist/Tracklist.js';

export class SearchResults extends React.Component
{
    render()
    {
        console.log('in search res');
        console.log(this.props.searchResults)
        return (
            <div className="SearchResults">
                <h2>Results</h2><br/>
                <Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
            </div>
        );
    }
}