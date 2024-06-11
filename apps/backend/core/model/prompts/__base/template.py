import re
from abc import ABC
from typing import Type, Dict

import yaml

from utils import logs

logger = logs.get_debug_logger(__name__.split(".")[-1])


class BasePromptTemplate(ABC):
    prompt_name: str
    template: str | None = None
    parameters: Dict[str, Type] | None = None

    @classmethod
    def _get_module_path(cls) -> str:
        module_path = "/".join(cls.__module__.split(".")[:-1])
        return module_path

    @classmethod
    def _template_config(cls) -> dict:
        """
        Method to get the configuration of the client.
        """
        module_path = cls._get_module_path()

        template_type = cls.__module__.split(".")[-2]
        template_yaml_path = f"{module_path}/{template_type}.yml"

        with open(template_yaml_path, encoding='utf-8') as f:
            yaml_data = yaml.safe_load(f)

        return yaml_data

    @classmethod
    def set_template(cls) -> str:
        try:
            cls.template = cls._template_config()["template"]
        except KeyError:
            cls.template = ""

        return cls.template

    @classmethod
    def set_parameters(cls, typing: Dict[str, Type] | None = None):
        cls.parameters = {key: str if key not in typing.keys() else typing[key] for key in
                          re.findall(r"\{(\w+)\}", cls.template)}

        return cls.parameters

    @classmethod
    def generate_prompt(cls, **kwargs):
        if cls.parameters is None:
            raise ValueError("Parameters not set for prompt")
        params = {}
        for key, value in kwargs.items():
            if key not in cls.parameters:
                raise ValueError(f"Invalid parameter {key} for prompt {cls.prompt_name}")

            if not isinstance(value, cls.parameters[key]):
                raise ValueError(f"Invalid type for parameter {key} for prompt {cls.prompt_name}")

            if cls.parameters[key] == list:
                params[key] = "- " + "\n- ".join(value)

            else:
                params[key] = value

        if not all(key in params for key in cls.parameters):
            raise ValueError(f"Missing parameters for prompt {cls.prompt_name}")

        return cls.template.format(**params)
