import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Task

async def main():
    agent = DeepAgent(model="openai/gpt-4o")
    
    task = Task(description="Derive provable defense mechanisms against adaptive adversarial attacks in deep learning, analyzing the fundamental trade-offs between model accuracy and robustness certificates, then document your theoretical framework in /docs/adversarial_defense.txt, implementation strategies in /docs/implementation.txt, and experimental results in /docs/experiments.txt")
    result = await agent.do_async(task)
    
    # Get filesystem statistics
    stats = agent.get_filesystem_stats()
    print(f"\nFilesystem Stats: {stats}")

asyncio.run(main())