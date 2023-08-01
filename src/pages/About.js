import React, { Component } from 'react';
import ProfilePicture from '../components/ProfilePicture';
import '../style/Profile.css';
import ReturnBtn from '../components/Buttons/ReturnBtn';
import ProfileContent from '../components/ProfileContent';

export default class About extends Component {
  render() {
    return (
      <section className='about-page'>
        <h1 className='title'>Sobre</h1>
        <div className='about-container'>
          <ProfilePicture />
          <ProfileContent />
        </div>
        <ReturnBtn />
      </section>
    )
  }
}
