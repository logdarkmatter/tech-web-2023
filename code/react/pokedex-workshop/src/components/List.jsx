import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal'


const List = () => {
    const navigate = useNavigate();
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonToDelete, setPokemonToDelete] = useState('');

    
    useEffect(() => {
        getPokemonList()
    }, []);

    const getPokemonList = () => {
        const url = "https://custompokedex.azurewebsites.net/api/pokedex";

        fetch(url)
            .then(result => result.json())
            .then(result => {
                setPokemonList(result)
            });
    }

    const handleEdit = (pokemon) => {
        navigate('/edit', { state: pokemon })
    }

    const HandleDelete = () => {
        const url = `https://custompokedex.azurewebsites.net/api/pokedex/${pokemonToDelete}`
        fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(result =>{
            if (result.status === 200) {
                getPokemonList()
            } else {
                alert('Error deleting pokemon, try again')
            }
        }).finally(() => {
            setPokemonToDelete('');
        })
    };




    const tableRows = pokemonList.map((entry, index) => {
        const { PokemonName, PokedexNumber, PokemonColor, PokemonType, PokemonAttacks } = entry;
        return (
            <tr key={index}>
                <td>{PokemonName}</td>
                <td>{PokedexNumber}</td>
                <td>{PokemonColor}</td>
                <td>{PokemonType}</td>
                <td style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <Col md='auto' onClick={()=>handleEdit({
                            name: PokemonName,
                            pokedexNumber: PokedexNumber,
                            pokemonColor: PokemonColor,
                            pokemonType: PokemonType,
                            pokemonAttacks: PokemonAttacks
                        })}>
                            <FontAwesomeIcon style={{textAlign: 'center'}} icon={faPencil} />
                        </Col>
                        <Col md="auto" onClick={()=>setPokemonToDelete(PokemonName)}>
                            <FontAwesomeIcon style={{textAlign: 'center'}} icon={faTrash} />
                        </Col>
                </td>
            </tr>
        );
    });

    return (
        <>
            <Table striped bordered hover>
                <TableHeader />
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
            <Modal 
                isOpen={!!pokemonToDelete} 
                onClose={() => setPokemonToDelete('')}
                onSubmit={HandleDelete}
                modalHeading='Are you sure you want to delete this pokemon?'
                modalBody={pokemonToDelete}
                onCloseText='Cancel'
                onSubmitText='Delete'
            />
        </>
    );
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Pokemon Name</th>
                <th>Pokedex Number</th>
                <th>Pokemon Color</th>
                <th>Pokemon Type</th>
                <th>Actions</th>
            </tr>
        </thead>
    );
}

export default List;