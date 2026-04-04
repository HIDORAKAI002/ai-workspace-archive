from upsonic import Agent, Task
from pydantic import BaseModel
from typing import List, Optional

class Metric(BaseModel):
    name: str
    value: float
    unit: str

class Recommendation(BaseModel):
    title: str
    description: str
    priority: str
    estimated_impact: float

class DetailedAnalysis(BaseModel):
    summary: str
    confidence: float
    metrics: List[Metric]
    recommendations: List[Recommendation]
    risk_factors: Optional[List[str]] = None

# Create agent
agent = Agent(model="openai/gpt-4o")

# Task with complex structured response
task = Task(
    description="Perform comprehensive analysis of the renewable energy sector with detailed metrics and recommendations",
    response_format=DetailedAnalysis
)

# Execute and access nested structured result
result = agent.do(task)
print(f"Summary: {result.summary}")
print(f"Confidence: {result.confidence}")
print(f"Metrics: {result.metrics}")
print(f"Recommendations: {result.recommendations}")