import React, { useState } from "react";

const MusicPlayer = () => {
  const [videoUrl, setVideoUrl] = useState(""); // State for YouTube video URL
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [audioUrl, setAudioUrl] = useState(""); // Audio file URL state

  const handlePlayAudio = async () => {
    if (!videoUrl) {
      alert("Please enter a valid YouTube video URL.");
      return;
    }

    setLoading(true); // Set loading state
    setError(""); // Clear previous errors

    try {
      // Send request to backend to fetch audio URL
      const response = await fetch(`http://localhost:5001/download-audio?url=${videoUrl}`);
      if (!response.ok) throw new Error("Failed to fetch audio");

      const { audioUrl } = await response.json(); // Extract audio URL from response
      setAudioUrl(audioUrl); // Set the audio URL state

    } catch (error) {
      console.error("Error fetching or playing audio:", error);
      setError("Failed to fetch or play audio. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Music Player</h1>
      <input
        type="text"
        placeholder="Enter YouTube video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)} // Update video URL state
        style={{ padding: "10px", width: "80%", marginBottom: "10px" }}
      />
      <br />
      <button
        onClick={handlePlayAudio} // Handle button click to play audio
        style={{ padding: "10px 20px", fontSize: "16px" }}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Loading..." : "Play Audio"} {/* Show loading or play text */}
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>} {/* Show error message if any */}
      
      {/* Play audio if audioUrl is available */}
      {audioUrl && (
        <div>
          <p>Audio Ready:</p>
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
