from upsonic import Agent, Task
from pydantic import BaseModel

class AnalysisResult(BaseModel):
    summary: str
    confidence: float
    recommendations: list[str]

# Create agent and task with structured response
agent = Agent(model="openai/gpt-4o")
task = Task(
    description="Analyze the current state of renewable energy and provide structured results",
    response_format=AnalysisResult
)

# Execute task
result = agent.do(task)
print(f"Summary: {result.summary}")
print(f"Confidence: {result.confidence}")
print(f"Recommendations: {result.recommendations}")