import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../App.css";

function Create() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditMode = useMemo(() => !!state, [state]);
  const [formData, setFormData] = useState({
    name: "",
    pokedexNumber: "",
    pokemonType: "",
    pokemonColor: "",
  });
  const [validated, setValidated] = useState(false);

  const { name, pokedexNumber, pokemonType, pokemonColor } = formData;

  useEffect(() => {
    // validate if all the fields are filled out
    if (!!name && !!pokedexNumber && !!pokemonType && !!pokemonColor) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [formData]);

  useEffect(() => {
    // When editing a Pokémon set the formData State with the data of the selected Pokémon
    if (state) {
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

      const createPokemonURL =
        "https://custompokedex.azurewebsites.net/api/pokedex/create";
      const updatePokemonURL = `https://custompokedex.azurewebsites.net/api/pokedex/${name}`;
      const body = JSON.stringify({
        name,
        pokedexNumber: Number(pokedexNumber),
        pokemonType,
        pokemonColor,
        pokemonAttacks: [],
      });

      const requestUrl = isEditMode ? updatePokemonURL : createPokemonURL;

      fetch(requestUrl, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body,
      })
        .then(async (response) => {
          if (response.status === 200) {
            return;
          }
          return response.text();
        })
        .then((message) => {
          if (message) {
            alert(message);
          } else {
            navigate("/list");
          }
        });
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const formDataCopy = { ...formData };
    setFormData({
      ...formDataCopy,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <h1 className="page-title">New Pokémon</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group md="4" controlId="name" style={{ display: "grid" }}>
            <Form.Label className="form-label">Pokémon Name</Form.Label>
            <Form.Control
              className="form-control"
              disabled={isEditMode}
              required
              type="text"
              placeholder="Enter the Pokémon's name"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <Form.Control.Feedback className="form-control-feedback">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback
              className="form-control-feedback"
              type="invalid"
            >
              Please provide a valid Pokémon Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group
            md="4"
            controlId="pokedexNumber"
            style={{ display: "grid" }}
          >
            <Form.Label className="form-label">Pokédex Number</Form.Label>
            <Form.Control
              className="form-control form-imput-number"
              disabled={isEditMode}
              required
              type="number"
              placeholder="Enter a Pokédex Number"
              name="pokedexNumber"
              value={pokedexNumber}
              onChange={handleChange}
            />
            <Form.Control.Feedback className="form-control-feedback">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback
              className="form-control-feedback"
              type="invalid"
            >
              Please provide a valid Pokédex Number.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group
            md="4"
            controlId="pokemonType"
            style={{ display: "grid" }}
          >
            <Form.Label className="form-label">Pokémon Type</Form.Label>
            <Form.Select
              className="form-control form-select"
              aria-label="Default select example"
              onChange={handleChange}
              name="pokemonType"
              value={pokemonType}
            >
              <option className="form-select-option" value="">-- Select a type --</option>
              <option className="form-select-option" value="normal">Normal</option>
              <option className="form-select-option" value="fire">Fire</option>
              <option className="form-select-option" value="water">Water</option>
              <option className="form-select-option" value="grass">Grass</option>
              <option className="form-select-option" value="electric">Electric</option>
              <option className="form-select-option" value="ice">Ice</option>
              <option className="form-select-option" value="fighting">Fighting</option>
              <option className="form-select-option" value="poison">Poison</option>
              <option className="form-select-option" value="flying">Flying</option>
              <option className="form-select-option" value="bug">Bug</option>
              <option className="form-select-option" value="psychic">Psychic</option>
              <option className="form-select-option" value="ghost">Ghost</option>
              <option className="form-select-option" value="dark">Dark</option>
              <option className="form-select-option" value="dragon">Dragon</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group
            md="4"
            controlId="pokemonColor"
            style={{ display: "grid" }}
          >
            <Form.Label className="form-label">Pokémon Color</Form.Label>
            <Form.Select
              className="form-control form-select"
              aria-label="Default select example"
              onChange={handleChange}
              name="pokemonColor"
              value={pokemonColor}
            >
              <option className="form-select-option" value="">-- Select a color --</option>
              <option className="form-select-option" value="red">Red</option>
              <option className="form-select-option" value="green">Green</option>
              <option className="form-select-option" value="blue">Blue</option>
              <option className="form-select-option" value="yellow">Yellow</option>
              <option className="form-select-option" value="black">Black</option>
              <option className="form-select-option" value="white">White</option>
              <option className="form-select-option" value="purple">Purple</option>
              <option className="form-select-option" value="orange">Orange</option>
              <option className="form-select-option" value="pink">Pink</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <div style={{ marginTop: "100px" }}>
          <Button className="custom-button submit-button" type="submit">
            Submit form
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Create;
