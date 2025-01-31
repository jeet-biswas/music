const express = require("express");
const ytDlp = require("yt-dlp");
const path = require("path");

const app = express();
const port = 5001;

app.use(express.static("public"));
app.use(express.json());

// Function to download audio and return the path
const downloadAudio = async (videoUrl) => {
  try {
    const output = path.resolve(__dirname, "downloads", "%(title)s.%(ext)s");
    const options = {
      extractAudio: true,
      audioFormat: "mp3",
      output,
    };

    const result = await ytDlp.exec([videoUrl, "-o", output], options);
    const audioUrl = `/downloads/${result[0].title}.mp3`;

    return audioUrl;
  } catch (error) {
    throw new Error("Failed to extract audio file");
  }
};

// Endpoint to handle audio download request
app.get("/download-audio", async (req, res) => {
  const videoUrl = req.query.url;
  try {
    const audioUrl = await downloadAudio(videoUrl);
    res.json({ audioUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to extract audio file" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
