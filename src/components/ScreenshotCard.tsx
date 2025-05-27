import React from 'react';
import { useInView } from 'react-intersection-observer';
import './UserScreenshots.css';

const ScreenshotCard = ({ src, alt, delay }: { src: string; alt: string; delay: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`col-10 col-md-6 col-lg-4 mb-4 transition-box ${
        inView ? 'animate-in' : 'hidden-box'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="shadow rounded-4 overflow-hidden hover-zoom">
        <img
          src={src}
          alt={alt}
          className="img-fluid"
          style={{ objectFit: 'cover', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default ScreenshotCard;
