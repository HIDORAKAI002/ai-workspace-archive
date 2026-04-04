from upsonic import Direct, Task
from pydantic import BaseModel

# Create Direct instance
direct = Direct(model="openai/gpt-4o")

# Define structured output
class Response(BaseModel):
    answer: str
    confidence: float

# Create and execute task
task = Task(
    description="What is 2 + 2? Provide confidence.",
    response_format=Response
)

result = direct.do(task)
print(f"Answer: {result.answer}")
print(f"Confidence: {result.confidence}")