'use client'
import React from 'react';

const ShareButton = ({ url, title, text, children }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
        console.log('Link shared successfully');
      } catch (error) {
        console.error('Error sharing link:', error);
      }
    } else {
      console.error('Share API not supported in this browser');
      alert('Sharing is not supported in your browser.');
    }
  };

  return (
    <button onClick={handleShare} className='hover:cursor-pointer'>
      {children}
    </button>
  );
};

export default ShareButton;
