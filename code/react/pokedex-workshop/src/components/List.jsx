import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

class List extends Component {
    state = {
        data: []
    };
    
    componentDidMount() {
        const url = "https://custompokedex.azurewebsites.net/api/pokedex/getall";

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result
                })
            });
    }

    render() {
        const { data } = this.state;

        const TableHeader = () => {
            return (
                <thead>
                    <tr>
                        <th>Pokemon Name</th>
                        <th>Pokedex Number</th>
                        <th>Pokemon Color</th>
                        <th>Pokemon Type</th>
                    </tr>
                </thead>
            );
        }

        const result = data.map((entry, index) => {
            console.log(entry);
            return (
                <tbody>
                    <tr key={index}>
                        <td>{entry.PokemonName}</td>
                        <td>{entry.PokedexNumber}</td>
                        <td>{entry.PokemonColor}</td>
                        <td>{entry.PokemonType}</td>
                    </tr>
                </tbody>
            );
        });

        return (
            <Table striped bordered hover>
                <TableHeader />
                {result}
            </Table>
        );
    }
}

export default List;