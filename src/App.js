import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import './App.css';


function App() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(null); // Track the current video playing
  const [playing, setPlaying] = useState(false); // Track if the audio is playing

  // Function to fetch videos
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
    if (query) {
      searchVideos(query);
    }
  };

  const handlePlayPause = (videoId) => {
    if (currentVideoId === videoId) {
      setPlaying(!playing); // Toggle play/pause for the current video
    } else {
      setCurrentVideoId(videoId); // Change the current video
      setPlaying(true); // Start playing the new video
    }
  };

  useEffect(() => {
    // Stop playing audio when videos list is empty or if no video is selected
    if (videos.length === 0) {
      setCurrentVideoId(null);
      setPlaying(false);
    }
  }, [videos]);

  return (
    <div className="App">
      <h1> Jeet Music Player</h1>

      {/* Search form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for music"
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading state */}
      {isLoading && <p>Loading...</p>}

      {/* Error state */}
      {error && <p>{error}</p>}

      {/* Display video list */}
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <p>{video.snippet.title}</p>

            {/* ReactPlayer to handle audio playback only */}
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              playing={currentVideoId === video.id.videoId && playing} // Only play if this is the selected video
              controls={true}  // Show the controls
              width="0px"      // Hide the video display
              height="0px"     // Hide the video display
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1, // Disable YouTube branding
                    rel: 0,            // Disable related videos
                    showinfo: 0,       // Disable video information
                    fs: 0,             // Disable fullscreen button
                    autoplay: 0,       // Do not autoplay initially
                    controls: 0,       // Hide the video controls
                  },
                },
              }}
            />
            {/* Play/Pause Button */}
            <button onClick={() => handlePlayPause(video.id.videoId)}>
              {currentVideoId === video.id.videoId && playing ? "Pause" : "Play"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
