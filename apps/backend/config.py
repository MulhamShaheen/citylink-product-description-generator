import os
from dotenv import load_dotenv

load_dotenv()

PROJECT_NAME = os.getenv("PROJECT_NAME")
DESCRIPTION = os.getenv("DESCRIPTION")

Y_TOKEN = os.getenv("Y_TOKEN")  # Yandex API token
