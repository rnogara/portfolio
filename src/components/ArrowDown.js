import React, { Component } from 'react';
import arrow from '../assets/arrow-down.png';
import '../style/ArrowDown.css'; 

export default class ArrowDown extends Component {
  render() {
    return (
      <img className='arrow-down' src={arrow} alt='flecha apontando para baixo'/>
    )
  }
}
