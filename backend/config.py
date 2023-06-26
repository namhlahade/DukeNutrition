import os
from dotenv import load_dotenv

"""Base configuration."""
load_dotenv('env/.env')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN', 'my_precious')