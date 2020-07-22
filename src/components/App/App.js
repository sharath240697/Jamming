import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify'

class App extends React.Component 
{

  constructor(props)
  {
    super(props);
    this.state = {searchResults:[{name: 'numb',artist:'LP',album:'meteor',id:'1'},{name: 'numb2',artist:'LP',album:'meteor',id:'2'}], playlistName: 'linkinpark', playlistTracks:[{album: "The Wall",artist: "Pink Floyd",id: "5HNCy40Ni5BZJFw1TKzRsC",name: "Comfortably Numb",uri: "spotify:track:5HNCy40Ni5BZJFw1TKzRsC"}]};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.resetPlaylist = this.resetPlaylist.bind(this);
  }

  addTrack(track)
  {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) 
    {
      return;
    }
    else
     {
      let newArr = this.state.playlistTracks;
      newArr.push(track);
     this.setState({playlistTracks: newArr});
      
      
     }
  }

  removeTrack(track)
  {
    var filtered = this.state.playlistTracks.filter( function(value, index, arr){
      return value.id !== track.id;
  });
    this.setState({playlistTracks: filtered});
  }

  updatePlaylistName(name)
  {
    this.setState({playlistName: name});
  }
  
  savePlaylist()
  {
    console.log("in app.js saveplaylist method");
    let trackUris=this.state.playlistTracks.map(track=> track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackUris,this.resetPlaylist);
  }

  async search(term)
  {
    console.log(term+" in app.js searh  method")
    let list = await Spotify.search(term);
    console.log(list);
    console.log(this.state.searchResults);
    if(typeof list !== "undefined")
      this.setState({searchResults: list});
  }

  resetPlaylist()
  {
    this.setState({playlistName:"New Playlist",playlistTracks:[]})
  }
  render()
  {
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
            </div>
          </div>
      </div>
      );
  }
}

export default App;
