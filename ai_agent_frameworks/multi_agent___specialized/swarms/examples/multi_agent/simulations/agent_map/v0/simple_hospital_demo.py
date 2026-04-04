#!/usr/bin/env python3
"""
Simple Hospital Agent Simulation Demo

A streamlined demo showing medical agents collaborating to treat a headache patient.
This uses the built-in task-based simulation features for easy setup and execution.

Medical Team:
🩺 Dr. Sarah (Emergency Doctor) - Initial assessment and triage
🧠 Dr. Michael (Neurologist) - Headache specialist evaluation
👩‍⚕️ Jennifer (RN) - Patient care coordination
🔬 Dr. Lisa (Radiologist) - Medical imaging interpretation
💊 Robert (PharmD) - Medication management
📋 Dr. Amanda (Coordinator) - Case management

CASE: 34-year-old female with sudden severe headache
"""

from typing import List

from swarms import Agent
from examples.multi_agent.simulations.agent_map.agent_map_simulation import (
    AgentMapSimulation,
)


def create_medical_agent(
    name: str, role: str, specialization: str
) -> Agent:
    """
    Create a medical agent with specialized knowledge.

    Args:
        name: Agent's name
        role: Medical role/title
        specialization: Area of medical expertise

    Returns:
        Configured medical Agent instance
    """
    system_prompt = f"""You are {name}, a {role} with expertise in {specialization}.

You are treating a 34-year-old female patient with:
- Chief complaint: Sudden severe headache ("worst headache of my life")
- Onset: 6 hours ago
- Associated symptoms: Nausea, light sensitivity  
- Vital signs: BP 145/92, HR 88, Normal temperature
- History: No trauma, takes oral contraceptives

When discussing with colleagues:
- Share your clinical insights relevant to your specialty
- Ask pertinent questions about the case
- Suggest appropriate next steps for diagnosis/treatment
- Keep responses professional but conversational (1-2 sentences)
- Consider differential diagnoses and treatment options

Focus on collaborative patient care and safety."""

    return Agent(
        agent_name=name,
        agent_description=f"{role} - {specialization}",
        system_prompt=system_prompt,
        model_name="gpt-5.4",
        dynamic_temperature_enabled=True,
        output_type="str",
        streaming_on=False,
        max_loops=1,
    )


def create_hospital_team() -> List[Agent]:
    """Create the medical team for the headache case."""

    team = [
        create_medical_agent(
            "Dr.Sarah_ER",
            "Emergency Physician",
            "rapid assessment, triage, emergency headache protocols",
        ),
        create_medical_agent(
            "Dr.Michael_Neuro",
            "Neurologist",
            "headache disorders, migraine diagnosis, neurological evaluation",
        ),
        create_medical_agent(
            "Jennifer_RN",
            "Registered Nurse",
            "patient monitoring, pain assessment, care coordination",
        ),
        create_medical_agent(
            "Dr.Lisa_Rad",
            "Radiologist",
            "head CT/MRI interpretation, neuroimaging for headaches",
        ),
        create_medical_agent(
            "Robert_PharmD",
            "Clinical Pharmacist",
            "headache medications, drug interactions, dosing optimization",
        ),
        create_medical_agent(
            "Dr.Amanda_Coord",
            "Medical Coordinator",
            "care planning, team coordination, discharge planning",
        ),
    ]

    return team


def main():
    """Run the hospital simulation."""
    print("🏥 Hospital Agent Simulation - Headache Case")
    print("=" * 50)

    # Create simulation environment
    print("🏗️  Setting up hospital environment...")
    hospital = AgentMapSimulation(
        map_width=50.0,
        map_height=50.0,
        proximity_threshold=10.0,  # Medical consultation distance
        update_interval=2.0,
    )

    # Create and add medical team
    print("👩‍⚕️ Assembling medical team...")
    medical_team = create_hospital_team()

    for agent in medical_team:
        hospital.add_agent(
            agent=agent, movement_speed=2.0, conversation_radius=10.0
        )

    print(f"✅ Medical team ready: {len(medical_team)} specialists")

    # Define the medical case/task
    headache_case = """
    URGENT CASE CONSULTATION:
    
    Patient: 34-year-old female presenting with sudden severe headache
    
    Key Details:
    - "Worst headache of my life" - onset 6 hours ago
    - Associated nausea and photophobia  
    - BP elevated at 145/92, otherwise stable vitals
    - No trauma history, currently on oral contraceptives
    - No fever or neck stiffness noted
    
    MEDICAL TEAM OBJECTIVES:
    1. Rule out emergent causes (SAH, stroke, meningitis)
    2. Determine appropriate diagnostic workup
    3. Develop treatment plan for symptom relief
    4. Plan for disposition and follow-up care
    
    Collaborate to provide comprehensive patient care.
    """

    print("\n🚨 CASE DETAILS:")
    print("📋 34-year-old female with sudden severe headache")
    print(
        "⚠️  'Worst headache of my life' - requires immediate evaluation"
    )
    print("🔍 Team will collaborate on diagnosis and treatment")

    try:
        # Run the hospital simulation
        print("\n🏥 Starting medical consultation simulation...")

        results = hospital.run(
            task=headache_case,
            duration=180,  # 3 minutes of medical consultations
            with_visualization=True,
            update_interval=3.0,
        )

        # Display results
        print("\n📊 SIMULATION RESULTS:")
        print(
            f"👥 Medical Team: {results['total_agents']} specialists"
        )
        print(
            f"🗣️  Consultations: {results['total_conversations']} conversations"
        )
        print(
            f"✅ Completed: {results['completed_conversations']} consultations"
        )
        print(
            f"⏱️  Duration: {results['duration_seconds']:.1f} seconds"
        )
        print(f"📄 Documentation: {results['summary_file']}")

        # Agent participation summary
        print("\n🩺 TEAM PARTICIPATION:")
        for agent_name, stats in results["agent_statistics"].items():
            consultations = stats["total_conversations"]
            partners = len(stats["partners_met"])
            print(
                f"  {agent_name}: {consultations} consultations with {partners} colleagues"
            )

        print("\n🎯 CASE OUTCOME:")
        if results["completed_conversations"] >= 3:
            print(
                "✅ Excellent team collaboration - multiple specialists consulted"
            )
            print("🤝 Comprehensive patient evaluation achieved")
        elif results["completed_conversations"] >= 1:
            print("✅ Good initial consultation completed")
            print("📋 Additional specialist input may be beneficial")
        else:
            print(
                "⚠️  Limited consultations - consider extending simulation time"
            )

        print("\n🏥 Hospital simulation completed successfully!")

    except Exception as e:
        print(f"\n❌ Simulation error: {str(e)}")
        import traceback

        traceback.print_exc()


if __name__ == "__main__":
    main()
