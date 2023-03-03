import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Create() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const isEditMode = useMemo(() => !!state, [state]);
  const [formData, setFormData] = useState({
    name: '',
    pokedexNumber: '',
    pokemonType: '',
    pokemonColor: ''
  });
  const [validated, setValidated] = useState(false);

  const { name, pokedexNumber, pokemonType, pokemonColor } = formData;

  useEffect(() => {
      // validate if all the fields are filled out
      if(!!name && !!pokedexNumber && !!pokemonType && !!pokemonColor) {
        setValidated(true);
      }else {
        setValidated(false);
      }
  }, [formData]);

  useEffect(() => {
    // When editing a pokemon set the formData State with the data of the selected pokemon
      if(state){        
        setFormData(state);
      }
  }, [state]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const createPokemonURL = 'https://custompokedex.azurewebsites.net/api/pokedex/create'
      const updatePokemonURL = `https://custompokedex.azurewebsites.net/api/pokedex/${name}`
      const body = JSON.stringify({
        name,
        pokedexNumber: Number(pokedexNumber),
        pokemonType,
        pokemonColor,
        pokemonAttacks: []
    });

      const requestUrl = isEditMode ? updatePokemonURL : createPokemonURL;

      fetch(requestUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body
      })
      .then(async (response) =>{        
        if (response.status === 200) {
          return;
        }
        return response.text()
      })
      .then((message) => {
        if(message) {
          alert(message);
        }else {
          navigate('/list');
        }
      })
    };
  };

  const handleChange = (event) => {
    event.preventDefault();
    const formDataCopy = {...formData};
    setFormData({
      ...formDataCopy,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group md="4" controlId="name">
          <Form.Label>Pokemon name</Form.Label>
            <Form.Control
                disabled={isEditMode}
                required
                type="text"
                placeholder="Pokemon name"
                name="name"
                value={name}
                onChange={handleChange}
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
            disabled={isEditMode}
            required
            type="number"
            placeholder="Pokedex Number"
            name="pokedexNumber"
            value={pokedexNumber}
            onChange={handleChange}
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
          <Form.Select aria-label="Default select example" onChange={handleChange} name='pokemonType' value={pokemonType}>
            <option value="">--select a type--</option>
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
          <Form.Select aria-label="Default select example" onChange={handleChange} name='pokemonColor' value={pokemonColor}>
            <option value="">--select a color--</option>
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