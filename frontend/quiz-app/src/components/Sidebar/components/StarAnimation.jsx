import { useEffect, useState } from 'react';

const Star = ({ style }) => (
  <svg
    className="absolute w-2 h-2 text-yellow-500 animate-twinkle"
    style={style}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2L9.1 9.1H2L7.5 13.9L5.7 21L12 16.9L18.3 21L16.5 13.9L22 9.1H14.9L12 2Z" />
  </svg>
);

export const StarAnimation = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
      },
    }));
    setStars(newStars);
  }, []);

  return stars.map((star) => <Star key={star.id} style={star.style} />);
};