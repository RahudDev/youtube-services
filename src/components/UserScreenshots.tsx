import React from 'react';
import ScreenshotCard from './ScreenshotCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const screenshots = [
  { id: 1, src: '/assets/reviews7.jpg', alt: 'Review 1' },
  { id: 2, src: '/assets/reviews2.jpg', alt: 'Review 2' },
  { id: 3, src: '/assets/reviews3.jpg', alt: 'Review 3' },
  { id: 4, src: '/assets/reviews4.jpg', alt: 'Review 4' },
  { id: 5, src: '/assets/reviews8.jpg', alt: 'Review 5' },
  { id: 6, src: '/assets/reviews9.jpg', alt: 'Review 6' },
];

const UserScreenshots = () => {
  return (
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-5">What Our Clients Say</h2>
      <div className="row justify-content-center">
        {screenshots.map((shot, index) => (
          <ScreenshotCard
            key={shot.id}
            src={shot.src}
            alt={shot.alt}
            delay={index * 150}
          />
        ))}
      </div>
    </section>
  );
};

export default UserScreenshots;
