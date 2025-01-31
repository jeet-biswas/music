import React from 'react';

function Player({ currentTrack }) {
  return (
    <div>
      <h3>Now Playing</h3>
      {currentTrack ? (
        <div>
          <p>{currentTrack.name} - {currentTrack.artist}</p>
          <audio controls>
            <source src={currentTrack.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
}

export default Player;
