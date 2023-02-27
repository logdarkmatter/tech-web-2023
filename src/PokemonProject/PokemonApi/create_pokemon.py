import logging
import json
import azure.functions as func
from azure.cosmosdb.table.models import Entity


def create_pokemon(req: func.HttpRequest, table_client: func.TableService, trainer_table_client: func.Out[Entity]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a POST request for Pokemon entity.')

    # Retrieve the JSON payload from the request body, if present
    req_body = req.get_json()

    # Define the name of the table to use for the Pokemon entity
    table_name = 'Pokemon'

    try:
        # Retrieve the attributes from the request body
        name = req_body.get('name')
        weight = req_body.get('weight')
        height = req_body.get('height')
        trainer_id = req_body.get('trainer_id')

        # Check that the trainer_id is a valid Trainer entity
        trainer_entity = trainer_table_client.get()
        if not any(entity for entity in trainer_entity if entity.RowKey == trainer_id):
            return func.HttpResponse(f'Error: Invalid trainer_id specified', status_code=400)

        # Check that the name is unique
        entities = table_client.query_entities(table_name, filter=f"name eq '{name}'")
        if len(entities.items) > 0:
            return func.HttpResponse(f'Error: Pokemon with name "{name}" already exists', status_code=409)

        # Check that the weight and height are positive integers
        if not isinstance(weight, int) or weight < 1:
            return func.HttpResponse(f'Error: weight must be a positive integer', status_code=400)
        if not isinstance(height, int) or height < 1:
            return func.HttpResponse(f'Error: height must be a positive integer', status_code=400)

        # Create a new Pokemon entity
        entity = Entity()
        entity.PartitionKey = 'pokemon'
        entity.RowKey = str(uuid.uuid4())
        entity.name = name
        entity.weight = weight
        entity.height = height
        entity.trainer_id = trainer_id

        # Insert the entity into the table
        table_client.insert_entity(table_name, entity)

        return func.HttpResponse(f'Pokemon with name "{name}" created successfully', status_code=201)
    except Exception as e:
        return
