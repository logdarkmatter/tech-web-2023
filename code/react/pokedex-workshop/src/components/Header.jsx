import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import pokeballIcon from'../assets/small-pokeball-icon.jpg';

class Header extends Component {
    
    render() {
        return (
            <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src={pokeballIcon}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/list">Pokemon List</Nav.Link>
                    <Nav.Link as={Link} to="/create">New Pokemon</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            </>
        );
    }
}

export default Header;