from pydantic import BaseModel


class DefaultPrompt(BaseModel):
    prompt: str

def default_prompt():
    return DefaultPrompt(prompt="""
You are a helpful agent that can complete tasks. Try to complete the task as best as you can. If you need any external information, check for tools. If not found, inform the user or ask for help. You MUST respect the cultural guidelines provided to you IF PROVIDED.
""")