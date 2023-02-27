import logging
import json
import azure.functions as func
from azure.cosmosdb.table.models import Entity

"""
Dependencies:
    pip install azure-cosmosdb-table

Azure Functions core tools
    npm install -g azure-functions-core-tools@3
"""
def main(req: func.HttpRequest, table_client: func.TableService, trainer_table_client: func.Out[Entity]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # Retrieve the HTTP method from the request
    method = req.method

    # Call the appropriate function for the HTTP method
    if method == 'GET':
        from .get_pokemon import get_pokemon
        return get_pokemon(req, table_client)
    elif method == 'POST':
        from .create_pokemon import create_pokemon
        return create_pokemon(req, table_client, trainer_table_client)
    elif method == 'PUT':
        from .update_pokemon import update_pokemon
        return update_pokemon(req, table_client)
    elif method == 'DELETE':
        from .delete_pokemon import delete_pokemon
        return delete_pokemon(req, table_client)
    else:
        return func.HttpResponse(f'Error: Invalid HTTP method specified', status_code=400)
