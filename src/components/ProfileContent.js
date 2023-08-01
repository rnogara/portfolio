import React, { Component } from 'react';
import bg from '../assets/content-bg.png';

export default class ProfileContent extends Component {
  render() {
    return (
      <div className='profile-content'>
        <div className='profile-content-conteiner'>
          <p className='profile-content-title'>Olá! Meu nome é <span className='profile-content-highlight'>Roberta Nogara</span> e sou uma desenvolvedora FullStack!</p>
          <br/>
          <p>Me formei em engenharia florestal e trabalhei com StartUp ainda durante a universidade. Neste segmento pude ter a oportunidade de conviver com um mundo de inovação e criatividade. Foi necessário me aprofundar em diferentes setores para trabalhar em conjunto dentro da multidisciplinaridade. Em paralelo, junto com os pioneiros no uso de drones no agronegócio, tentamos começar uma nova era tecnológica no setor.</p>
          <p>Hoje tento me recolocar na área de desenvolvimento que aos poucos fui me envolvendo e gostando cada vez mais. Nesta mudança busco estabilidade além do crescimento pessoal.</p>
          <p>
          Hoje minhas principais linguages e ferramentas são: HTML, CSS, JavaScript, Jest, React.js, Redux, Docker, MySQL, Node.js, Sequelize, TypeScript e JWT.
          </p>
        </div>
        <img className='profile-content-bg' src={ bg } alt='Imagem de fundo do conteúdo' />
      </div>
    )
  }
}
