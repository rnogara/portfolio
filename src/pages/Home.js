import React from 'react';
import AboutMeBtn from '../components/Buttons/AboutBtn';
import ArrowDown from '../components/ArrowDown';
import MainTitle from '../components/Titles/MainTitle';
import TopProjectsTitle from '../components/Titles/TopProjectsTitle';
import TopProjects from './TopProjects';

export default function Home() {
  return (
    <div className='home-page'>
      <section>
        <AboutMeBtn/>
        <MainTitle/>
        <ArrowDown/>
      </section>
      <section className='home-page-part2'>
        <TopProjectsTitle />
        <TopProjects />
      </section>
    </div>
  )
}
