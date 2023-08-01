import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../style/ReturnBtn.css';

export default function ReturnBtn() {
  const navigate = useNavigate();
  return (
    <button className='return-btn' onClick={() => navigate('/')}>
      <p>Return</p>
    </button>
  )
}
