import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import pokeballIcon from '../assets/small-pokeball-icon.jpg';

class Header extends Component {
  render() {
    const SlowFastSlow = () => {
      const animation = {
        rotate: [0, 180, 360],
        scale: 1.2,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
          times: [0, 0.25, 0.5],
        },
      };
      return (
        <motion.img
          whileHover={animation}
          whileTap={{ scale: 1.4 }}
          src={pokeballIcon}
          width="70"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      );
    };

    return (
      <>
        <Navbar variant="dark" className="navbar-custom">
          <Container className="justify-content-center">
            <Nav className="mx-auto justify-content-between">
              <Nav.Link exact as={Link} className="NavLink" activeClassName="active" to="/"><SlowFastSlow /></Nav.Link>
              <Nav.Link as={Link} className="NavLink" activeClassName="active" to="/list">Pokémon List</Nav.Link>
              <Nav.Link as={Link} className="NavLink" activeClassName="active" to="/create">New Pokémon</Nav.Link>
              <Nav.Link as={Link} className="NavLink" activeClassName="active" to="/about">About PokéManager</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
