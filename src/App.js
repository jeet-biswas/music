import React, { useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { FaHome, FaMusic, FaUser, FaList, FaSignOutAlt } from "react-icons/fa";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch videos
  const searchVideos = async (query) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://v1.nocodeapi.com/jeetbiswas12/yt/SrONwjHigQhTSvJn/search?q=${query} music&type=video`
      );
      if (response.data && response.data.items) {
        setVideos(response.data.items);
      } else {
        setError("No music videos found.");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to fetch videos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchVideos(query);
    }
  };

  const handlePlayPause = (videoId) => {
    if (currentVideoId === videoId) {
      setPlaying(!playing);
    } else {
      setCurrentVideoId(videoId);
      setPlaying(true);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="logo">🎵 Jeet Music</h2>
        <ul>
          <li className="active"><FaHome className="icon" /> Home</li>
          <li><FaMusic className="icon" /> Categories</li>
          <li><FaUser className="icon" /> Artists</li>
          <li><FaList className="icon" /> Playlists</li>
          <li className="logout"><FaSignOutAlt className="icon" /> Logout</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main">
        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for music in jeet music ..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {/* Loading & Error */}
        {isLoading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {/* Display Video List */}
        <div className="video-list">
          {videos.map((video, index) => (
            <div key={index} className="video-item">
              {/* Song Thumbnail */}
              <img 
                src={video.snippet.thumbnails.medium.url} 
                alt={video.snippet.title} 
                className="video-thumbnail"
              />

              {/* Song Title */}
              <p className="video-title">{video.snippet.title}</p>

              {/* ReactPlayer for audio playback */}
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                playing={currentVideoId === video.id.videoId && playing}
                controls
                width="0px"
                height="0px"
              />

              {/* Play/Pause Button */}
              <button
                className="play-button"
                onClick={() => handlePlayPause(video.id.videoId)}
              >
                {currentVideoId === video.id.videoId && playing ? "Pause" : "Play"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Menu for Small Screens */}
      <div className="footer-menu">
      <button><FaHome className="icon" /> Home</button>
      <button><FaMusic className="icon" /> Categories</button>
      <button><FaUser className="icon" /> Artists</button>
      <button><FaList className="icon" /> Playlists</button>

      </div>
    </div>
  );
}

export default App;
