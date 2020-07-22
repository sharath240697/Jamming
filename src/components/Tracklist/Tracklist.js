import React from 'react';
import './Tracklist.css'
import {Track} from '../Track/Track.js'

export class Tracklist extends React.Component
{
    trackArray()
    {
        let newarr = this.props.tracks.map(track => {
            return <li key={track.id}> <Track track={track}  onAdd={this.props.onAdd} onRemove={this.props.onRemove} removal={this.props.isRemoval} /> </li>;
        })
        return newarr;
    }
    
    render()
    {
        console.log('in tracklist.js');
        return(
            <div className="TrackList">
                <ul>
                 {
                     this.trackArray()
                 }
                 </ul>
            </div>
        );
    }
}
