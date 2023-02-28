import logging
import json
import azure.functions as func
from azure.cosmosdb.table.tableservice import TableService

def delete_pokemon(req: func.HttpRequest, table_client: TableService) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a DELETE request for Pokemon entity.')

    # Retrieve the partition key and row key from the request URL
    partition_key = req.route_params.get('partition_key')
    pokemon_id = req.route_params.get('row_key')

    # Define the name of the table to use for the Pokemon entity
    table_name = 'Pokemon'
    trainer_table_name = 'Trainer'

    # Retrieve the existing entity from the table
    entity = table_client.get_entity(table_name, 'pokemon', pokemon_id)

    # Check that there are no trainers associated with the Pokemon
    trainer_id = entity.trainer_id
    entities = table_client.query_entities(trainer_table_name, filter=f"RowKey eq '{trainer_id}'")
    if len(entities.items) > 0:
        return func.HttpResponse(f'Error: Pokemon with ID "{pokemon_id}" is associated with a Trainer and cannot be deleted', status_code=400)

    # Delete the entity from the table
    table_client.delete_entity(table_name, 'pokemon', pokemon_id)

    return func.HttpResponse(f'Pokemon with ID "{pokemon_id}" deleted successfully', status_code=200)
