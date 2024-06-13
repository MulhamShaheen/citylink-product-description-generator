from core.model.client import YGPTClient
from core.model.prompts.marketing import MarketingPromptTemplate

print(MarketingPromptTemplate.generate_prompt(product_info="product_info"))
# YGPTClient.generate("What is the meaning of life?", 1000)
