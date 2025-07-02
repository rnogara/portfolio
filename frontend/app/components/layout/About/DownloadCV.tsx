import React from 'react';

interface DownloadCVProps {
  cvUrl: string;
  className?: string;
  children?: React.ReactNode;
  cvBtn?: string;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ 
  cvUrl,
  cvBtn, 
  className = 'border border-white p-2 rounded-lg hover:bg-white hover:text-black transition-colors cursor-pointer font-[Jura] text-[1rem] font-bold md:text-xl text-shadow-md',
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
      {cvBtn}
    </button>
  );
};

export default DownloadCV;