import React from 'react';
import './Playlist.css';
import {Tracklist} from '../Tracklist/Tracklist.js';

export class Playlist extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(event)
    {
        this.props.onNameChange(event.target.value);
    }
    render()
    {
        console.log('in playlist');
        return(
            <div className="Playlist">
                 <input onChange={this.handleNameChange} placeholder='linkinpark'/>
                 <Tracklist tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove}/>
                 <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}