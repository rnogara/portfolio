import React from 'react';
import { useNavigate } from "react-router-dom";
import profile from '../../assets/profile.png';
import '../../style/AboutBtn.css';

export default function AboutMeBtn() {
  const navigate = useNavigate();
  return (
    <button className='about-btn' onClick={() => navigate('/about')}>
      <img src={ profile } alt='botão para pagina sobre'/>
      <p>Sobre</p>
    </button>
  )
}
