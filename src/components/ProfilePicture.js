import React, { Component } from 'react';
import profile from '../assets/profile.png';

export default class ProfilePicture extends Component {
  render() {
    return (
      <img className='profile-picture' src={ profile } alt='Foto de Roberta Nogara' />
    )
  }
}
