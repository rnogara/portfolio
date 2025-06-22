'use client';
import React from 'react';
import Background from './components/Background';

export default function Home() {
  const bgUrls: string[] = [
    '/background/first.jpg',
    '/background/second.jpg',
    '/background/matrix.mp4',
    '/background/helloWorld.mp4'
  ];

  return (
    <div className="relative">
      <Background bgUrls={bgUrls} />
      <div className="content">
        <div className="section" style={{ height: '100vh' }}>
          <div className="section-content">
            <h2>Section 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante tincidunt placerat.</p>
          </div>
        </div>
        <div className="section z-0" style={{ height: '170vh' }}>
          <div className="section-content">
            <h2>Section 2</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante tincidunt placerat.</p>
          </div>
        </div>
        <div className="section" style={{ height: '100vh' }}>
          <div className="section-content">
            <h2>Section 3</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante tincidunt placerat.</p>
          </div>
        </div>
        <div className="section" style={{ height: '100vh' }}>
          <div className="section-content bg-black">
            <h2>Section 4</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante tincidunt placerat.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
