import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MilkywayBlog.css"
import logo from './blog-image/youtube-blog.png'


const blogPosts = [
  {
    title: "How to Grow Your YouTube Channel in 2025",
    excerpt: "Master the latest techniques to skyrocket your subscribers.",
    date: "August 10, 2025",
    image: logo,
  },
  {
    title: "Make Money from YouTube Without 1,000 Subs",
    excerpt: "Monetization hacks for small creators with big dreams.",
    date: "August 9, 2025",
    image: logo,
  },
  {
    title: "Top SEO Tips to Rank Your Videos Faster",
    excerpt: "Get your videos discovered with advanced SEO strategies.",
    date: "August 8, 2025",
    image: logo,
  },
  {
    title: "Boost Watch Time with These Simple Tricks",
    excerpt: "Engage viewers longer and please the algorithm.",
    date: "August 7, 2025",
    image: logo,
  },
  {
    title: "Why Milky Way Cluster is the Best Growth Service",
    excerpt: "Trusted by thousands, here's what sets us apart.",
    date: "August 6, 2025",
    image: logo,
  },
  {
    title: "Increase Engagement with CTAs and Polls",
    excerpt: "Turn passive viewers into active participants.",
    date: "August 5, 2025",
    image: logo,
  },
  {
    title: "10 Profitable Niches for YouTube Creators",
    excerpt: "Explore niche ideas that pay off in 2025.",
    date: "August 4, 2025",
    image: logo,
  },
  {
    title: "Understanding YouTube Monetization Rules",
    excerpt: "Stay compliant and keep your revenue flowing.",
    date: "August 3, 2025",
    image: logo,
  },
  {
    title: "Create a Content Plan That Works",
    excerpt: "Consistency is key—here's how to stay on track.",
    date: "August 2, 2025",
    image: logo,
  },
  {
    title: "Video Trends That Will Dominate in 2025",
    excerpt: "Stay ahead with these emerging content styles.",
    date: "August 1, 2025",
    image: logo,
  },
];

const MilkyWayBlog = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Milky Way Cluster Tips & Tricks</h2>
      <div className="row g-4">
        {blogPosts.map((post, idx) => (
          <div className="col-md-6 col-lg-4" key={idx}>
            <div className="card-body-blog h-100 shadow-sm border-0 rounded-4">
              <img src={post.image} className="card-img-top rounded-top-4" alt={post.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold">{post.title}</h5>
                <p className="card-text text-date-blog text-muted small">{post.date}</p>
                <p className="card-text">{post.excerpt}</p>
                <a href={`/academy/${idx + 1}`} className="btn btn-outline-primary mt-auto rounded-pill">
                  Read More →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilkyWayBlog;
