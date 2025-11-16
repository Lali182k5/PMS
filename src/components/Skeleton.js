import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type = 'text', count = 1, className = '' }) => {
  const skeletons = Array.from({ length: count });

  const renderSkeleton = () => {
    switch (type) {
      case 'title':
        return <div className={`skeleton skeleton-title ${className}`}></div>;
      case 'text':
        return <div className={`skeleton skeleton-text ${className}`}></div>;
      case 'avatar':
        return <div className={`skeleton skeleton-avatar ${className}`}></div>;
      case 'thumbnail':
        return <div className={`skeleton skeleton-thumbnail ${className}`}></div>;
      case 'card':
        return (
          <div className={`skeleton-card ${className}`}>
            <div className="skeleton skeleton-title" style={{ width: '50%' }}></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text" style={{ width: '75%' }}></div>
          </div>
        );
      default:
        return <div className={`skeleton skeleton-text ${className}`}></div>;
    }
  };

  return (
    <>
      {skeletons.map((_, index) => (
        <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      ))}
    </>
  );
};

export default Skeleton;
