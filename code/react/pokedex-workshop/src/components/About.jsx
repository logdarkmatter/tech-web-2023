import React from 'react';
import pikachuRunner from'../assets/pikachuRunner.gif';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-page">
        <h1 className="page-title">About PokéManager</h1>
        <p className="about-content">With the help of our app, you can create your custom pokémon in just a few steps. You can choose the type of pokémon, select special abilities, customize colors, name, and much more.</p>
        <p className="about-content">Our team of experts work tirelessly to provide you with the best experience possible.</p>
        <p className="about-content">Our app offers a wide range of customization options, allowing you to create a pokémon that is officially unique. You can adjust your Pokémon's appearance, choose its type, define its strengths and weaknesses, and even create a story unique to it.</p>
        <p className="about-content">Furthermore, our Pokémon breeding app is easy to use and offers an intuitive interface. Even if you're a beginner, you'll be able to create your own unique Pokémon without any difficulties. With our app, creating your custom Pokémon is a fun and easy task.</p>
        <p className="about-content">So, if you're a Pokémon fan who's always dreamed of creating your own unique character, access our Pokémon Breeding app now. With it, you can bring your imagination to life and create the Pokémon of your dreams!</p>   
        <img src={pikachuRunner} width="120" height="auto" style={{ justifySelf: "center", position: "fixed", bottom: "55px", zIndex: 0 }} ></img>
      </div>
    </div>
  );
};

export default About;