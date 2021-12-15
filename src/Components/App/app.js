import {SearchBar} from '../SearchBar/searchbar';
import {SearchResults} from '../SearchResults/searchresults';
import {Playlist} from '../playlist/playlist';
import './app.css';
import React from 'react';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [], 
      playlistName: 'My playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);

  }

  addTrack(track){
    let tracksToCheck = this.state.playlistTracks;
    if (tracksToCheck.find(trackAdded => trackAdded.id===track.id)) {
      return;
    }
    tracksToCheck.push(track);
    this.setState({playlistTracks: tracksToCheck});
        
  }

  removeTrack(track) {
    this.setState( {playlistTracks: this.state.playlistTracks.filter(trackAdded => trackAdded.id!==track.id)} );
  }

  updatePlaylistName(name) {
    this.setState( {playlistName: name} );
  }

  savePlaylist() {
    const trackUris=this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(alert("Playlist saved")).then(() => {
      this.setState({
        searchResults: [],
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }
  
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search} />
    <div class="App-playlist">
      <SearchResults searchResults= {this.state.searchResults} onAdd= {this.addTrack} />
      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
  );
  }
  
}

export default App;
