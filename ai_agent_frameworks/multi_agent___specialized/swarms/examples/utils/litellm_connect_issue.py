from swarms.utils import LiteLLM, NetworkConnectionError

model = LiteLLM(model_name="gpt-5.4")

try:
    response = model.run(task="Your task here")
    print(response)
except NetworkConnectionError as e:
    print(f"Network issue: {e}")
    print("Trying to use local model")
