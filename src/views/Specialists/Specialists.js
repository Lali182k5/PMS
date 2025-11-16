import React, { useState, useEffect } from 'react';
import './Specialist.css';
import { useFilter } from '../../context/FilterContext';

const doctors = [
  {
    name: 'Dr.D.Vasanthi',
    specialization: 'Cardiologist',
    rating: 4.7,
    image: '/images/likitha.jpg',
    description: 'Expert in heart-related diseases and interventional procedures.'
  },
  {
    name: 'Dr.E.Likhitha Sai',
    specialization: 'Psychiatrist',
    rating: 4.8,
    image: '/images/sai.jpg',
    description: 'Specializes in mental health, anxiety, depression, and behavioral therapy.'
  },
  {
    name: 'Dr.K.Divya Deepika',
    specialization: 'Pediatrician',
    rating: 4.6,
    image: '/images/deepu.jpg',
    description: 'Caring for children’s health, vaccinations, and child development.'
  },
  {
    name: 'Dr.B.Pravallika',
    specialization: 'Neurologist',
    rating: 4.9,
    image: '/images/pravallika.jpg',
    description: 'Treats epilepsy, stroke, brain and spinal cord disorders.'
  },
  {
    name: 'Dr.M.Pravallika',
    specialization: 'Orthopedic Surgeon',
    rating: 4.5,
    image: '/images/pravallika2.jpg',
    description: 'Handles fractures, arthritis, joint replacements, and spine care.'
  },
  {
    name: 'Dr.C.Yasaswi',
    specialization: ' Gynecologist',
    rating: 4.4,
    image: '/images/yashu.jpg',
    description: 'Specialist in women\'s reproductive health, pregnancy care, and hormonal issues.'
  },
];

const Specialists = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleElements, setVisibleElements] = useState([]);
  const { filters } = useFilter();
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Enhanced motion sequence
    const sequence = [
      { element: 'title', delay: 150 },
      { element: 'cards', delay: 400 }
    ];
    
    sequence.forEach(({ element, delay }) => {
      setTimeout(() => {
        setVisibleElements(prev => [...prev, element]);
      }, delay);
    });
  }, []);

  const isVisible = (element) => visibleElements.includes(element);
  
  const getCardMotionStyle = (index) => {
    const isOdd = index % 2;
    const baseOffset = isOdd ? 150 : -150;
    const rotateY = isOdd ? 20 : -20;
    
    if (!isVisible('cards')) {
      return {
        transform: `translateX(${baseOffset}px) rotateY(${rotateY}deg) scale(0.7)`,
        opacity: 0,
        filter: 'blur(8px)'
      };
    }
    
    return {
      transform: 'translateX(0) rotateY(0deg) scale(1)',
      opacity: 1,
      filter: 'blur(0px)',
      transitionDelay: `${index * 0.15}s`
    };
  };
  
  const globalText = (filters && filters.text) ? filters.text.trim().toLowerCase() : '';
  const globalType = filters?.type || 'all';

  const effectiveSearch = globalText && (globalType === 'all' || globalType === 'doctors') ? globalText : '';

  const visibleDoctors = effectiveSearch
    ? doctors.filter(doc => (
        doc.name.toLowerCase().includes(effectiveSearch) ||
        doc.specialization.toLowerCase().includes(effectiveSearch) ||
        (doc.description || '').toLowerCase().includes(effectiveSearch)
      ))
    : doctors;

  return (
    <div className={`specialists-container ${isLoaded ? 'loaded' : ''}`}>
      <h2 
        className={`specialists-title ${isVisible('title') ? 'title-visible' : ''}`}
        style={{
          transform: isVisible('title') 
            ? 'translateX(0) rotateY(0deg) scale(1)' 
            : 'translateX(-150px) rotateY(-25deg) scale(0.8)',
          opacity: isVisible('title') ? 1 : 0,
          filter: isVisible('title') ? 'blur(0px)' : 'blur(6px)',
          transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transformOrigin: 'left center'
        }}
      >
        Our Specialists
      </h2>
      <div className={`doctor-cards ${isVisible('cards') ? 'cards-loaded' : ''}`}>
        {visibleDoctors.map((doc, index) => (
          <div 
            className="doctor-card" 
            key={index}
            style={{ 
              ...getCardMotionStyle(index),
              transition: 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transformOrigin: 'center center'
            }}
          >
            <img src={doc.image} alt={doc.name} className="doctor-image" />
            <h3>{doc.name}</h3>
            <p className="specialization">{doc.specialization}</p>
            <div className="rating">⭐ {doc.rating}/5</div>
            <p className="description">{doc.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specialists;
