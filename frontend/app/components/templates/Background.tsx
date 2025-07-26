'use client';
import React, { useRef, useEffect, useState } from 'react';

interface BackgroundProps {
  bgUrls: string[];
}

export default function Background({ bgUrls }: BackgroundProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [dimensions, setDimensions] = useState({
    windowHeight: 0,
    firstBgOpacity: 1,
    secondBgHeight: '0px',
    secondBgOpacity: 0,
    matrixOpacity: 0,
    videoOpacity: 0,
    helloOpacity: 0,
    zIndex: 1
  });

  // Update dimensions and calculations when scrollY changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const windowHeight = window.innerHeight;
    const secondBgHeight = windowHeight * 2.0; // Increased height to extend into section 3
    
    // Calculate opacities based on scroll position
    // First background - fade out only after second background is fully visible
    let firstBgOpacity = 1;
    if (scrollY >= windowHeight * 0.4) {
      firstBgOpacity = 1 - ((scrollY - windowHeight * 0.4) / (windowHeight * 0.2));
      firstBgOpacity = Math.max(0, firstBgOpacity);
    }
    
    // Second background - fade in during the transition
    let secondBgOpacity = 0;
    if (scrollY >= windowHeight * 0.4) {
      secondBgOpacity = Math.min(1, (scrollY - windowHeight * 0.4) / (windowHeight * 0.2));
    }
    
    // Matrix video - from section 2 to section 3
    let matrixOpacity = 0;
    if (scrollY >= windowHeight * 1.5 && scrollY < windowHeight * 2.0) {
      // Fade in during second half of section 2
      matrixOpacity = Math.min(Math.max((scrollY - windowHeight * 1.5) / (windowHeight * 0.5), 0), 0.4);
    } else if (scrollY >= windowHeight * 2.0 && scrollY < windowHeight * 3.0) {
      // Stay visible in section 3
      matrixOpacity = 0.4;
    } else if (scrollY >= windowHeight * 3.0) {
      // Fade out at start of section 4
      matrixOpacity = Math.max(0, 0.4 - ((scrollY - windowHeight * 3.0) / (windowHeight * 0.5)));
    }
    
    // Hello World video - only in section 4, fully opaque
    const helloOpacity = scrollY >= windowHeight * 3.0 ? 1 : 0;
    
    // Z-index handling
    let zIndex = 1;
    if (scrollY >= windowHeight * 1.5) {
      zIndex = 3; // Matrix video on top during sections 2-3
    }
    if (scrollY >= windowHeight * 3.0) {
      zIndex = 4; // Hello video on top in section 4
    }
    
    setDimensions({
      windowHeight,
      firstBgOpacity,
      secondBgHeight: `${secondBgHeight}px`,
      secondBgOpacity,
      matrixOpacity,
      videoOpacity: matrixOpacity > 0 ? 1 : 0,
      helloOpacity,
      zIndex
    });
  }, [scrollY]);

  // Handle scroll and resize events
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Handle video playback
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        
        // Matrix video is active in sections 2-3, Hello video in section 4
        const isHelloVideo = index === 1;
        const sectionStart = isHelloVideo ? windowHeight * 3.0 : windowHeight * 1.5;
        const sectionEnd = isHelloVideo ? windowHeight * 5.0 : windowHeight * 3.0;
        const isInView = scrollPosition >= sectionStart && scrollPosition <= sectionEnd;
        
        if (isInView) {
          video.play().catch(e => console.error('Error playing video:', e));
        } else {
          video.pause();
          if (!isHelloVideo) { // Only reset matrix video
            video.currentTime = 0;
          }
        }
      });
    };

    // Initial call to set up initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="background-wrapper">
      {/* First background - full height */}
      <div 
        className="background-layer first-bg" 
        style={{ 
          backgroundImage: `url(${bgUrls[0]})`,
          opacity: dimensions.firstBgOpacity
        }}
      />
      
      {/* Second background - extended height */}
      <div 
        className="background-layer second-bg"
        style={{ 
          backgroundImage: `url(${bgUrls[1]})`,
          opacity: dimensions.secondBgOpacity,
          height: dimensions.secondBgHeight
        }}
      />
      
      {/* Matrix video - taller height */}
      <div 
        className="background-layer matrix-video"
        style={{
          opacity: dimensions.matrixOpacity,
          zIndex: dimensions.zIndex,
          height: '120vh', // Taller height for the Matrix video
          top: '-10vh', // Adjust position to center the extra height
        }}
      >
        <video 
          ref={el => {videoRefs.current[0] = el}} 
          src={bgUrls[2]} 
          loop 
          muted 
          playsInline
          style={{
            opacity: dimensions.videoOpacity
          }}
        />
      </div>
      
      {/* Hello World video */}
      <div 
        className="background-layer hello-video"
        style={{
          opacity: dimensions.helloOpacity,
          zIndex: dimensions.zIndex
        }}
      >
        <video 
          ref={el => {videoRefs.current[1] = el}} 
          src={bgUrls[3]} 
          loop 
          muted 
          playsInline
        />
      </div>
      
      <div className="background-overlay"></div>
    </div>
  );
}