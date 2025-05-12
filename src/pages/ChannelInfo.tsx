import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../App';
import VideoStatsPage from './VideoStatsPage';

interface ChannelThumbnails {
  default: { url: string };
  medium: { url: string };
  high: { url: string };
}

interface ChannelInfo {
  title: string;
  description: string;
  thumbnails: ChannelThumbnails;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

const Channeldata: React.FC = () => {
  const [channel, setChannel] = useState<ChannelInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (!user.username) {
          setError('Username not found in local storage.');
          setLoading(false);
          return;
        }

        const { data } = await axios.post(`${API}/api/youtube/get-channel-info`, {
          username: user.username,
        });

        const snippet = data.channelInfo.snippet;
        const stats = data.channelInfo.statistics;

        setChannel({
          title: snippet.title,
          description: snippet.description,
          thumbnails: snippet.thumbnails,
          subscriberCount: stats.subscriberCount,
          videoCount: stats.videoCount,
          viewCount: stats.viewCount,
        });
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.error || 'Failed to fetch channel info');
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading channel info...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow rounded-4 p-4">
        <div className="d-flex align-items-center mb-4">
          <img
            src={channel?.thumbnails.high.url}
            alt="Channel Thumbnail"
            className="rounded-circle me-3"
            style={{ width: '80px', height: '80px' }}
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="mb-0">{channel?.title}</h4>
            {channel?.description && (
              <p className="text-muted">{channel.description}</p>
            )}
          </div>
        </div>
        <div className="row text-center">
          <div className="col">
            <h6>Subscribers</h6>
            <p className="fw-bold">{channel?.subscriberCount}</p>
          </div>
          <div className="col">
            <h6>Videos</h6>
            <p className="fw-bold">{channel?.videoCount}</p>
          </div>
          <div className="col">
            <h6>Views</h6>
            <p className="fw-bold">{channel?.viewCount}</p>
          </div>
        </div>
      </div>
      <div>
        <VideoStatsPage/>
      </div>
    </div>
  );
};

export default Channeldata;
