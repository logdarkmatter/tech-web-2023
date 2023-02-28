import logging
import json
import azure.functions as func
from azure.cosmosdb.table.models import Entity
from azure.cosmosdb.table.tableservice import TableService

def update_pokemon(req: func.HttpRequest, table_client: TableService, trainer_table_client: TableService) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a PUT request for Pokemon entity.')

    partition_key = "pokemon"
    pokemon_id = req.route_params.get('row_key')

    # Retrieve the JSON payload from the request body, if present
    req_body = req.get_json()

    # Define the name of the table to use for the Pokemon entity
    table_name = 'Pokemon'
    trainer_table_name = 'Trainer'
    
    # Retrieve the attributes from the request body
    name = req_body.get('name')
    weight = req_body.get('weight')
    height = req_body.get('height')
    trainer_id = req_body.get('trainer_id')

    # Retrieve the existing entity from the table
    entity = table_client.get_entity(table_name, 'pokemon', pokemon_id)

    # Check that the trainer_id is a valid Trainer entity
    if trainer_id is None:
        entity.trainer_id = None
    else:
        entities = trainer_table_client.query_entities(trainer_table_name, filter=f"RowKey eq '{trainer_id}'")
        if len(entities.items) == 0:
            return func.HttpResponse(f'Error: Invalid trainer_id specified', status_code=400)

    # Check that the name is unique if it has been changed
    if name is not None and name != entity.name:
        entities = table_client.query_entities(table_name, filter=f"name eq '{name}'")
        if len(entities.items) > 0:
            return func.HttpResponse(f'Error: Pokemon with name "{name}" already exists', status_code=409)

    # Check that the weight and height are positive integers if they have been changed
    if weight is not None:
        if not isinstance(weight, int) or weight < 1:
            return func.HttpResponse(f'Error: weight must be a positive integer', status_code=400)
        entity.weight = weight
    if height is not None:
        if not isinstance(height, int) or height < 1:
            return func.HttpResponse(f'Error: height must be a positive integer', status_code=400)
        entity.height = height

    # Update the entity with the new values, if present
    if name is not None:
        entity.name = name
    if trainer_id is not None:
        entity.trainer_id = trainer_id

    # Update the entity in the table
    table_client.update_entity(table_name, entity)

    return func.HttpResponse(f'Pokemon with ID "{pokemon_id}" updated successfully', status_code=200)