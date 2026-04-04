from upsonic import Direct, Task
from upsonic.models.settings import ModelSettings
from pydantic import BaseModel

# Define structured output
class ExtractedData(BaseModel):
    company_name: str
    tax_number: str
    total_amount: float

# Create Direct instance with configuration
settings = ModelSettings(temperature=0.1, max_tokens=500)
direct = Direct(
    model="openai/gpt-4o",
    settings=settings
)

# Create task with PDF attachment
task = Task(
    description="Extract company name, tax number, and total amount from the invoice",
    context=["invoice.pdf"],
    response_format=ExtractedData
)

# Execute
result = direct.do(task)
print(f"Company: {result.company_name}")
print(f"Tax Number: {result.tax_number}")
print(f"Amount: ${result.total_amount}")