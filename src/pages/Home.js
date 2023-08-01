import React from 'react';
import AboutMeBtn from '../components/Buttons/AboutBtn';
import ArrowDown from '../components/ArrowDown';
import MainTitle from '../components/Titles/MainTitle';
import TopProjects from './TopProjects';

export default function Home() {
  return (
    <div>
      <section>
        <AboutMeBtn/>
        <MainTitle/>
        <ArrowDown/>
      </section>
      <section>
        <TopProjects />
      </section>
    </div>
  )
}
