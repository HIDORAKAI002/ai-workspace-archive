from upsonic import Agent, Task
from pydantic import BaseModel
from typing import List

# Define structured response format
class AnalysisResult(BaseModel):
    summary: str
    confidence: float
    recommendations: List[str]

# Create agent
agent = Agent("openai/gpt-4o")

# Create task with configuration
task = Task(
    description="Analyze the market trends for Q4 2024",
    response_format=AnalysisResult,
    enable_thinking_tool=True,
    enable_cache=True,
    cache_method="llm_call",
    cache_threshold=0.8,
    cache_duration_minutes=30
)

# Execute task
result = agent.do(task)
print(result.summary)
print(f"Confidence: {result.confidence}")
print(f"Recommendations: {result.recommendations}")