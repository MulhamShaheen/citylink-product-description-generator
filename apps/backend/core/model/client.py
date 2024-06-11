import json
import time
from datetime import datetime
from typing import Dict

import pytz as pytz
import requests

from core.auth.update_creds import update_iam_token

utc = pytz.UTC


class YGPTClient:
    model_url = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'
    model_name = 'yandexgpt-lite'
    _iam_token: str | None = None
    _folder_id: str | None = None
    prompt_templates: Dict[str, str]

    @classmethod
    def authenticate(cls):
        with open("creds.json", "r") as json_file:
            creds = json.load(json_file)
        expires_dt = datetime.fromisoformat(creds["expiresAt"])
        if expires_dt < utc.localize(datetime.now()):
            raise ValueError("IAM token expired")
            # cls.iam_token = update_iam_token()
        cls._folder_id = creds["folderId"]
        cls._iam_token = creds["iamToken"]
        return cls._iam_token

    @classmethod
    def generate(cls, prompt: str, max_length: int = 1000, temperature: float = 0.3):
        if cls._iam_token is None:
            cls.authenticate()

        auth_headers = {
            'Authorization': f'Bearer {cls._iam_token}'
        }

        data = {
            "modelUri": f"gpt://{cls._folder_id}/{cls.model_name}",
            "completionOptions": {
                "stream": False,
                "temperature": temperature,
                "maxTokens": max_length
            },
            "messages": [
                {
                    "role": "system",
                    "text": "You are a smart assistant"
                },
                {
                    "role": "user",
                    "text": f"{prompt}"
                }
            ]
        }

        response = requests.post(cls.model_url, headers=auth_headers, json=data)

        return response.json()
