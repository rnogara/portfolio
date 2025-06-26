import React from 'react';

interface DownloadCVProps {
  cvUrl: string;
  className?: string;
  children?: React.ReactNode;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ 
  cvUrl, 
  className = 'border border-white p-2 rounded-lg hover:bg-white hover:text-black transition-colors cursor-pointer font-[Jura] text-[1rem] font-bold md:text-xl text-shadow-md',
  children = 'Download CV' 
}) => {
  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const filePath = `/curriculum-vitae/${cvUrl}.pdf`;
    
    const link = document.createElement('a');
    link.href = filePath;
    link.download = cvUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <button 
      onClick={handleDownloadCV} 
      className={className}
      aria-label="Download Curriculum Vitae"
    >
      {children}
    </button>
  );
};

export default DownloadCV;