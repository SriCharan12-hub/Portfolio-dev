import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      gsap.to(cursor, {
        x,
        y,
        duration: 0, // Instant
      });

      gsap.to(follower, {
        x,
        y,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(follower, {
        scale: 2.5,
        backgroundColor: 'rgba(0, 242, 255, 0.1)',
        borderColor: 'var(--primary-neon)',
        duration: 0.3
      });
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.3
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'var(--secondary-neon)',
        duration: 0.3
      });
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3
      });
    };

    const links = document.querySelectorAll('a, button, .interactive');
    links.forEach(link => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        id="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--primary-neon)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
      />
      <div 
        ref={followerRef} 
        id="custom-follower"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '1px solid var(--secondary-neon)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;
