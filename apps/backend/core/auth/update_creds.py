import json

import requests

from config import Y_TOKEN


def update_iam_token():
    url = "https://iam.cloud.ibm.com/identity/token"

    data = {
        "yandexPassportOauthToken": Y_TOKEN,
    }

    response = requests.get(url, data=data, headers={"Content-Type": "application/json"})
    with open("creds.json", "w") as f:
        json.dump(response.json(), f)

    print(response.json())
    return response.json()["iamToken"]
