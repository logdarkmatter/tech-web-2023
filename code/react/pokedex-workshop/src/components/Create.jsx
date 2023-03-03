import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Create() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            let body = JSON.stringify({
                "name": event.target.pokemonName.value,
                "pokedexNumber": Number(event.target.pokedexNumber.value),
                "pokemonType": event.target.pokemonType.value,
                "pokemonColor": event.target.pokemonColor.value
            });

            fetch('https://custompokedex.azurewebsites.net/api/pokedex/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body
            });
        };

        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group md="4" controlId="pokemonName">
                    <Form.Label>Pokemon name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Pokemon name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Pokemon Name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group md="4" controlId="pokedexNumber">
                    <Form.Label>Pokedex Number</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Pokedex Number"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Pokedex Number.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group md="4" controlId="pokemonType">
                    <Form.Label>Pokemon Type</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option value="normal">Normal</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="ice">Ice</option>
                        <option value="fighting">Fighting</option>
                        <option value="poison">Poison</option>
                        <option value="flying">Flying</option>
                        <option value="bug">Bug</option>
                        <option value="psychic">Psychic</option>
                        <option value="ghost">Ghost</option>
                        <option value="dark">Dark</option>
                        <option value="dragon">Dragon</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group md="4" controlId="pokemonColor">
                    <Form.Label>Pokemon Color</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                        <option value="pink">Pink</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default Create;