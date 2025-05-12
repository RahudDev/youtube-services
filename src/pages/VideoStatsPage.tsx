import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from "../App";

interface VideoData {
  videoTitle: string;
  publishedAt: string;
  duration: string;
  views: string;
  likes: string;
  comments: string;
  thumbnail: string;
}

const VideoStatsPage: React.FC = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [username, setUsername] = useState('@rahuddev');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load username from localStorage on mount
  useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const username = userData.username;
    if (username) {
      setUsername(username);
    }
  }, []);

  const handleFetch = async () => {
    if (!videoTitle.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API}/api/youtube/get-video-info`, {
        username,
        videoTitle,
      });

      setVideoData(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
      setVideoData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">YouTube Video Stats</h2>

      <input
        type="text"
        value={username}
        readOnly
        className="w-full mb-2 p-2 border rounded bg-gray-100 text-gray-700 cursor-not-allowed"
      />

      <input
        type="text"
        value={videoTitle}
        onChange={(e) => setVideoTitle(e.target.value)}
        placeholder="Enter video title"
        className="w-full mb-2 p-2 border rounded"
      />

      <button
        onClick={handleFetch}
        className="w-full p-2 bg-blue-600 btn-primary rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Get Video Stats'}
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {videoData && (
        <div className="mt-6 p-4 border rounded shadow-sm">
          <img src={videoData.thumbnail} alt="Thumbnail"   className="w-full max-h-60 object-cover rounded mb-4 shadow" />
          <h3 className="text-xl font-bold">{videoData.videoTitle}</h3>
          <p><strong>Published:</strong> {new Date(videoData.publishedAt).toLocaleDateString()}</p>
          <p><strong>Duration:</strong> {videoData.duration}</p>
          <p><strong>Views:</strong> {Number(videoData.views).toLocaleString()}</p>
          <p><strong>Likes:</strong> {Number(videoData.likes).toLocaleString()}</p>
          <p><strong>Comments:</strong> {Number(videoData.comments).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default VideoStatsPage;
