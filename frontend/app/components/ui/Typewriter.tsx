'use client';
import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  strings: string[];
  cursor?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
  loop?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({
  strings = ['Hello', 'World'],
  cursor = '|',
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 1500,
  loop = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingPaused, setTypingPaused] = useState(false);
  const currentString = strings[currentIndex % strings.length];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (typingPaused) {
      timeoutId = setTimeout(() => {
        setTypingPaused(false);
        setIsDeleting(true);
      }, delay);
      return;
    }

    if (isDeleting) {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
      }
    } else {
      if (displayText.length < currentString.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else if (loop || currentIndex < strings.length - 1) {
        setTypingPaused(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, currentIndex, isDeleting, typingPaused, currentString, delay, deletingSpeed, typingSpeed, strings, loop]);

  return (
    <span className="typewriter">
      {displayText}
      <span className="cursor text-shadow-none">{cursor}</span>
    </span>
  );
};

export default Typewriter;