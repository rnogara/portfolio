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
        <aside className='about-contact'>
          <a href='mailto:r.nogara.dev@gmail.com' rel='noreferrer noopener'>
            <img className='about-icons' src='https://img.icons8.com/neon/96/gmail.png' alt='gmail' />
          </a>
          <a href='https://www.linkedin.com/in/robertanogara/' target='_blanck' rel='noreferrer noopener'>
            <img className='about-icons' src='https://img.icons8.com/neon/96/linkedin.png' alt='linkedin' />
          </a>
          <a href='https://github.com/rnogara' target='_blanck' rel='noreferrer noopener'>
            <img className='about-icon-github' src='https://img.icons8.com/nolan/64/github.png' alt='github' />
          </a>
        </aside>
        <ReturnBtn />s
      </section>
    )
  }
}
