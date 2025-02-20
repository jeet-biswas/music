import React, { useState } from "react";

const MusicPlayer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handlePlayAudio = async () => {
    if (!videoUrl) {
      alert("Please enter a valid YouTube video URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5001/download-audio?url=${videoUrl}`);
      if (!response.ok) throw new Error("Failed to fetch audio");

      const { audioUrl } = await response.json();
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error("Error fetching or playing audio:", error);
      setError("Failed to fetch or play audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎵 Music Player 🎵</h1>
      <input
        type="text"
        placeholder="Enter YouTube video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={styles.input}
      />
      <button
        onClick={handlePlayAudio}
        style={loading ? styles.buttonDisabled : styles.button}
        disabled={loading}
      >
        {loading ? "Loading..." : "Play Audio"}
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {audioUrl && (
        <div style={styles.audioContainer}>
          <p style={styles.audioText}>Audio Ready:</p>
          <audio controls style={styles.audio}>
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "10px",
    maxWidth: "500px",
    margin: "50px auto",
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    fontFamily: "Roboto, sans-serif",
  },
  input: {
    padding: "12px",
    width: "85%",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    outline: "none",
    marginBottom: "15px",
  },
  button: {
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#ff4b2b",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
    fontWeight: "bold",
  },
  buttonDisabled: {
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#888",
    color: "white",
    cursor: "not-allowed",
  },
  buttonHover: {
    backgroundColor: "#e02d12",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px",
  },
  audioContainer: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#333",
  },
  audioText: {
    fontSize: "14px",
    color: "#ddd",
  },
  audio: {
    width: "100%",
    outline: "none",
  },
};

export default MusicPlayer;
