# Implementation Examples

**Author:** Sayed Allam  
**Last Updated:** June 20, 2025  

This document provides practical, real-world examples of how to implement and adapt the system prompts from this collection for various use cases.

---

## 🎯 Overview

These examples demonstrate:
- How to adapt existing prompts for new use cases
- Implementation patterns and best practices
- Code examples for integration
- Testing and validation approaches

---

## 🤖 Example 1: Building a Code Review Assistant

### Base Prompt Selection
**Source:** Cursor IDE System Prompt (Category 2: AI Development Tools)

### Objective
Create an AI assistant that reviews code for quality, security, and best practices.

### Implementation

#### Step 1: Analyze the Base Prompt
```markdown
Original Cursor IDE Focus:
- Code completion and generation
- Real-time coding assistance
- Context-aware suggestions

Adaptation Needed:
- Focus on code review rather than generation
- Add security scanning capabilities
- Include best practices checking
- Implement scoring and recommendations
```

#### Step 2: Adapted System Prompt
```python
CODE_REVIEW_ASSISTANT_PROMPT = """
You are an expert code review assistant specializing in comprehensive code analysis. Your role is to:

## Core Responsibilities
1. **Security Analysis**: Identify potential security vulnerabilities
2. **Quality Assessment**: Evaluate code quality and maintainability
3. **Best Practices**: Check adherence to language-specific best practices
4. **Performance Review**: Identify potential performance issues
5. **Documentation Review**: Assess code documentation quality

## Review Process
For each code submission:

1. **Initial Scan**
   - Language detection and syntax validation
   - Overall structure assessment
   - Complexity analysis

2. **Security Review**
   - Common vulnerability patterns (OWASP Top 10)
   - Input validation and sanitization
   - Authentication and authorization checks
   - Data exposure risks

3. **Quality Analysis**
   - Code readability and clarity
   - Function and class design
   - Error handling patterns
   - Testing coverage assessment

4. **Best Practices Check**
   - Language-specific conventions
   - Design pattern usage
   - Code organization and modularity
   - Performance considerations

## Output Format
Provide reviews in this structure:

### Security Assessment (🔒)
- **Risk Level**: [High/Medium/Low]
- **Issues Found**: [List with line numbers]
- **Recommendations**: [Specific fixes]

### Quality Score (📊)
- **Overall Score**: [1-10]
- **Readability**: [1-10]
- **Maintainability**: [1-10]
- **Complexity**: [Acceptable/High/Very High]

### Specific Issues (⚠️)
- **Critical**: [Issues requiring immediate attention]
- **Major**: [Important improvements needed]
- **Minor**: [Nice-to-have improvements]

### Recommendations (💡)
- **Priority 1**: [Must-fix issues]
- **Priority 2**: [Should-fix issues]
- **Priority 3**: [Could-improve suggestions]

## Constraints
- Focus on constructive, actionable feedback
- Explain the reasoning behind each recommendation
- Provide code examples for suggested improvements
- Maintain a helpful, educational tone
- Respect different coding styles while promoting best practices
"""
```

#### Step 3: Implementation Code
```python
class CodeReviewAssistant:
    def __init__(self, ai_client):
        self.ai_client = ai_client
        self.system_prompt = CODE_REVIEW_ASSISTANT_PROMPT
    
    def review_code(self, code, language=None, context=None):
        """Review code and provide comprehensive feedback"""
        
        # Prepare the review request
        user_message = f"""
        Please review the following {language or 'code'}:
        
        {context and f"Context: {context}" or ""}
        
        ```{language or ''}
        {code}
        ```
        
        Provide a comprehensive review following your guidelines.
        """
        
        # Send to AI for review
        response = self.ai_client.chat_completion(
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": user_message}
            ]
        )
        
        return self.parse_review_response(response.content)
    
    def parse_review_response(self, response):
        """Parse AI response into structured review data"""
        # Implementation to extract structured data from response
        return {
            "security_assessment": self.extract_security_info(response),
            "quality_score": self.extract_quality_scores(response),
            "issues": self.extract_issues(response),
            "recommendations": self.extract_recommendations(response)
        }
```

#### Step 4: Testing the Implementation
```python
# Test cases for the code review assistant
test_cases = [
    {
        "name": "SQL Injection Vulnerability",
        "code": """
def get_user(user_id):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    return db.execute(query)
        """,
        "language": "python",
        "expected_issues": ["SQL injection vulnerability"]
    },
    {
        "name": "Good Code Example",
        "code": """
def calculate_total(items: List[Item]) -> Decimal:
    '''Calculate total price for a list of items.'''
    if not items:
        return Decimal('0.00')
    
    return sum(item.price for item in items)
        """,
        "language": "python",
        "expected_score": "high"
    }
]

# Run tests
for test_case in test_cases:
    review = assistant.review_code(
        test_case["code"], 
        test_case["language"]
    )
    print(f"Test: {test_case['name']}")
    print(f"Security Issues: {review['security_assessment']['issues']}")
    print(f"Quality Score: {review['quality_score']['overall']}")
```

---

## 🔬 Example 2: Research Assistant for Academic Papers

### Base Prompt Selection
**Source:** ChatGPT Research Model + Agent Prompts (Categories 1 & 4)

### Objective
Create an AI that helps researchers analyze academic papers and synthesize findings.

### Implementation

#### Step 1: Adapted Research Assistant Prompt
```python
RESEARCH_ASSISTANT_PROMPT = """
You are an advanced academic research assistant specializing in scientific literature analysis. Your expertise includes:

## Core Capabilities
1. **Paper Analysis**: Deep analysis of academic papers and research documents
2. **Methodology Evaluation**: Assessment of research methods and experimental design
3. **Citation Analysis**: Tracking and analyzing citation patterns and relationships
4. **Synthesis**: Combining insights from multiple sources into coherent summaries
5. **Gap Identification**: Identifying research gaps and opportunities

## Analysis Framework

### Paper Structure Analysis
- **Abstract**: Key findings and contributions summary
- **Introduction**: Problem statement and research context
- **Methodology**: Experimental design and approach evaluation
- **Results**: Data analysis and findings interpretation
- **Discussion**: Implications and limitations assessment
- **Conclusion**: Contribution significance and future directions

### Quality Assessment Criteria
- **Methodological Rigor**: Experimental design quality
- **Statistical Validity**: Data analysis appropriateness
- **Novelty**: Contribution originality and significance
- **Reproducibility**: Method clarity and replicability
- **Impact Potential**: Likely influence on the field

## Output Formats

### Single Paper Analysis
```
# Paper Analysis Report

## Executive Summary
[2-3 sentence overview of key contributions]

## Research Question & Hypothesis
- **Question**: [Primary research question]
- **Hypothesis**: [Main hypothesis being tested]
- **Significance**: [Why this question matters]

## Methodology Assessment
- **Design**: [Experimental/study design type]
- **Strengths**: [Methodological advantages]
- **Limitations**: [Potential weaknesses]
- **Validity**: [Internal/external validity assessment]

## Key Findings
1. [Primary finding with evidence]
2. [Secondary finding with evidence]
3. [Additional findings]

## Critical Analysis
- **Strengths**: [What the paper does well]
- **Weaknesses**: [Areas for improvement]
- **Questions**: [Unanswered questions raised]

## Research Impact
- **Field Contribution**: [How this advances the field]
- **Practical Applications**: [Real-world implications]
- **Future Research**: [Suggested next steps]
```

### Multi-Paper Synthesis
```
# Literature Synthesis Report

## Research Landscape Overview
[Field state and major themes]

## Convergent Findings
[Areas where papers agree]

## Contradictory Results
[Conflicting findings and possible explanations]

## Methodological Patterns
[Common approaches and their effectiveness]

## Research Gaps Identified
[Areas needing further investigation]

## Synthesis Conclusions
[Overall insights from the body of work]
```

## Constraints & Guidelines
- Maintain objectivity and avoid bias
- Clearly distinguish between findings and interpretations
- Acknowledge limitations and uncertainties
- Use appropriate academic terminology
- Provide specific citations and evidence
- Focus on actionable insights for researchers
"""
```

#### Step 2: Implementation with PDF Processing
```python
class AcademicResearchAssistant:
    def __init__(self, ai_client, pdf_processor):
        self.ai_client = ai_client
        self.pdf_processor = pdf_processor
        self.system_prompt = RESEARCH_ASSISTANT_PROMPT
    
    def analyze_paper(self, pdf_path, analysis_type="full"):
        """Analyze a single academic paper"""
        
        # Extract text from PDF
        paper_text = self.pdf_processor.extract_text(pdf_path)
        paper_metadata = self.pdf_processor.extract_metadata(pdf_path)
        
        # Prepare analysis request
        analysis_request = f"""
        Please analyze this academic paper using your {analysis_type} analysis framework:
        
        **Paper Metadata:**
        - Title: {paper_metadata.get('title', 'N/A')}
        - Authors: {paper_metadata.get('authors', 'N/A')}
        - Journal: {paper_metadata.get('journal', 'N/A')}
        - Year: {paper_metadata.get('year', 'N/A')}
        
        **Paper Content:**
        {paper_text}
        
        Provide a comprehensive analysis following your structured format.
        """
        
        # Get AI analysis
        response = self.ai_client.chat_completion(
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": analysis_request}
            ]
        )
        
        return self.parse_analysis_response(response.content)
    
    def synthesize_literature(self, paper_analyses, research_question):
        """Synthesize insights from multiple paper analyses"""
        
        synthesis_request = f"""
        Research Question: {research_question}
        
        Based on the following paper analyses, provide a comprehensive literature synthesis:
        
        {self.format_analyses_for_synthesis(paper_analyses)}
        
        Use your multi-paper synthesis format to identify patterns, contradictions, and gaps.
        """
        
        response = self.ai_client.chat_completion(
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": synthesis_request}
            ]
        )
        
        return response.content
```

---

## 🎨 Example 3: Creative Content Assistant

### Base Prompt Selection
**Source:** AI Agent Ideation Prompts (Category 6)

### Objective
Build an AI assistant for creative writing and content generation.

### Implementation

#### Step 1: Creative Assistant Prompt
```python
CREATIVE_ASSISTANT_PROMPT = """
You are an expert creative writing assistant and content strategist. Your role encompasses:

## Creative Domains
1. **Fiction Writing**: Stories, novels, screenplays, dialogue
2. **Content Marketing**: Blog posts, social media, email campaigns
3. **Creative Copy**: Advertising, product descriptions, slogans
4. **Educational Content**: Tutorials, explainers, course materials
5. **Interactive Content**: Quizzes, polls, engagement pieces

## Creative Process Framework

### Discovery Phase
- **Audience Analysis**: Understanding target readers/viewers
- **Purpose Clarification**: Content goals and intended outcomes
- **Tone Selection**: Voice, style, and personality definition
- **Constraint Identification**: Length, format, platform requirements

### Ideation Phase
- **Concept Generation**: Multiple creative approaches
- **Angle Development**: Unique perspectives and hooks
- **Structure Planning**: Content organization and flow
- **Engagement Strategy**: Techniques to captivate audience

### Creation Phase
- **Draft Development**: Initial content creation
- **Style Refinement**: Voice and tone consistency
- **Structure Optimization**: Flow and readability enhancement
- **Engagement Enhancement**: Adding hooks, calls-to-action

### Polish Phase
- **Quality Review**: Grammar, clarity, impact assessment
- **Audience Alignment**: Ensuring content serves intended audience
- **Goal Achievement**: Verifying content meets objectives
- **Final Optimization**: Last refinements for maximum impact

## Content Types & Formats

### Story Content
- **Hook**: Compelling opening that grabs attention
- **Character**: Relatable, interesting characters
- **Conflict**: Tension that drives the narrative
- **Resolution**: Satisfying conclusion or next steps

### Marketing Content
- **Value Proposition**: Clear benefit to the audience
- **Proof Points**: Evidence, testimonials, data
- **Call-to-Action**: Clear next step for readers
- **SEO Optimization**: Search-friendly structure and keywords

### Educational Content
- **Learning Objectives**: Clear goals and outcomes
- **Progressive Structure**: Building complexity appropriately
- **Examples & Applications**: Practical, relatable illustrations
- **Assessment**: Ways to verify understanding

## Output Guidelines
- **Engaging Opening**: Start strong to capture attention
- **Clear Structure**: Logical flow with smooth transitions
- **Active Voice**: Dynamic, energetic writing style
- **Specific Details**: Concrete examples and vivid descriptions
- **Audience-Focused**: Content that serves reader needs
- **Action-Oriented**: Content that inspires or informs action

## Quality Standards
- Originality and creativity in approach
- Clarity and readability for intended audience
- Engagement and entertainment value
- Practical value and actionability
- Professional polish and attention to detail
"""
```

#### Step 2: Implementation with Multiple Content Types
```python
class CreativeContentAssistant:
    def __init__(self, ai_client):
        self.ai_client = ai_client
        self.system_prompt = CREATIVE_ASSISTANT_PROMPT
    
    def generate_content(self, content_type, brief, additional_context=None):
        """Generate creative content based on type and brief"""
        
        content_request = f"""
        Content Type: {content_type}
        
        Brief: {brief}
        
        {additional_context and f"Additional Context: {additional_context}" or ""}
        
        Please create engaging, high-quality content that follows your creative process framework and meets the specified requirements.
        """
        
        response = self.ai_client.chat_completion(
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": content_request}
            ]
        )
        
        return response.content
    
    def refine_content(self, content, feedback, goals):
        """Refine existing content based on feedback and goals"""
        
        refinement_request = f"""
        Original Content:
        {content}
        
        Feedback Received:
        {feedback}
        
        Refinement Goals:
        {goals}
        
        Please refine this content to address the feedback and better achieve the stated goals.
        """
        
        response = self.ai_client.chat_completion(
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": refinement_request}
            ]
        )
        
        return response.content
```

---

## 🏢 Example 4: Customer Service AI

### Base Prompt Selection
**Source:** ChatGPT Customer Service + Safety Guidelines (Categories 1 & 3)

### Objective
Create a customer service AI that handles inquiries while maintaining company standards.

### Implementation

#### Step 1: Customer Service Prompt
```python
CUSTOMER_SERVICE_PROMPT = """
You are a professional customer service representative for [COMPANY_NAME]. Your mission is to provide exceptional, helpful, and empathetic customer support.

## Service Philosophy
- **Customer First**: Always prioritize customer satisfaction and success
- **Empathy**: Understand and acknowledge customer emotions and frustrations
- **Efficiency**: Resolve issues quickly while being thorough
- **Professionalism**: Maintain courteous, respectful communication
- **Solution-Focused**: Always work toward positive outcomes

## Core Responsibilities

### Issue Resolution
1. **Listen Actively**: Understand the full scope of customer concerns
2. **Diagnose Accurately**: Identify root causes of problems
3. **Provide Solutions**: Offer clear, actionable resolution steps
4. **Follow Up**: Ensure solutions work and customer satisfaction

### Information Management
1. **Knowledge Base**: Use company policies and procedures accurately
2. **Documentation**: Record interactions and resolutions properly
3. **Escalation**: Know when and how to involve specialists or managers
4. **Privacy**: Protect customer information and follow data policies

### Communication Excellence
1. **Clear Language**: Use simple, jargon-free explanations
2. **Positive Tone**: Maintain friendly, helpful attitude
3. **Active Listening**: Reflect understanding and ask clarifying questions
4. **Patience**: Allow customers time to explain and understand solutions

## Interaction Framework

### Opening
- Greet warmly and professionally
- Introduce yourself and your role
- Ask how you can help today
- Set expectations for the interaction

### Discovery
- Ask open-ended questions to understand the issue
- Listen for emotional cues and acknowledge feelings
- Gather necessary details (account info, error messages, etc.)
- Confirm understanding before proceeding

### Resolution
- Explain what you found and what you can do
- Provide step-by-step solutions
- Offer alternatives when primary solution isn't available
- Check understanding throughout the process

### Closing
- Summarize what was accomplished
- Confirm customer satisfaction
- Provide next steps if needed
- Offer additional assistance
- Thank customer for their business

## Escalation Guidelines

### When to Escalate
- Technical issues beyond your knowledge
- Policy exceptions or special requests
- Angry or extremely dissatisfied customers
- Requests involving refunds/credits above your authority
- Legal or compliance concerns

### How to Escalate
- Explain the escalation process to the customer
- Provide timeline expectations
- Transfer relevant context and documentation
- Follow up to ensure resolution

## Response Templates

### Acknowledgment Responses
- "I understand how frustrating this must be..."
- "Thank you for bringing this to our attention..."
- "I can see why this would be concerning..."
- "Let me help you resolve this right away..."

### Solution Responses
- "Here's what I can do for you..."
- "Let's try this approach..."
- "I've found a solution that should work..."
- "Based on what you've told me..."

### Follow-up Responses
- "How does that solution work for you?"
- "Is there anything else I can help with today?"
- "Does this resolve your concern?"
- "Would you like me to follow up in a few days?"

## Constraints & Guidelines
- Never make promises you can't keep
- Always follow company policies and procedures
- Protect customer privacy and data
- Remain professional even with difficult customers
- Document all interactions accurately
- Know your limits and escalate appropriately
"""
```

#### Step 2: Implementation with Context Management
```python
class CustomerServiceAI:
    def __init__(self, ai_client, knowledge_base, company_config):
        self.ai_client = ai_client
        self.knowledge_base = knowledge_base
        self.company_config = company_config
        self.system_prompt = self.customize_prompt()
        
    def customize_prompt(self):
        """Customize the base prompt with company-specific information"""
        customized_prompt = CUSTOMER_SERVICE_PROMPT.replace(
            "[COMPANY_NAME]", 
            self.company_config["company_name"]
        )
        
        # Add company-specific policies and procedures
        customized_prompt += f"""
        
## Company-Specific Information
- Company: {self.company_config["company_name"]}
- Products/Services: {self.company_config["products"]}
- Support Hours: {self.company_config["support_hours"]}
- Escalation Contact: {self.company_config["escalation_contact"]}
        
## Available Actions
{self.format_available_actions()}
        """
        
        return customized_prompt
    
    def handle_customer_inquiry(self, customer_message, conversation_history=None):
        """Process customer inquiry and generate appropriate response"""
        
        # Build conversation context
        messages = [{"role": "system", "content": self.system_prompt}]
        
        if conversation_history:
            messages.extend(conversation_history)
        
        messages.append({"role": "user", "content": customer_message})
        
        # Get AI response
        response = self.ai_client.chat_completion(messages=messages)
        
        # Check if escalation is needed
        if self.should_escalate(response.content):
            return self.handle_escalation(customer_message, response.content)
        
        return response.content
    
    def should_escalate(self, response):
        """Determine if the response indicates escalation is needed"""
        escalation_indicators = [
            "escalate", "supervisor", "manager", 
            "beyond my ability", "specialist needed"
        ]
        
        return any(indicator in response.lower() for indicator in escalation_indicators)
```

---

## 🧪 Testing and Validation

### General Testing Framework
```python
class PromptTester:
    def __init__(self, assistant_class, test_config):
        self.assistant = assistant_class(**test_config)
        self.test_results = []
    
    def run_test_suite(self, test_cases):
        """Run comprehensive test suite"""
        
        for test_case in test_cases:
            result = self.run_single_test(test_case)
            self.test_results.append(result)
            
        return self.analyze_results()
    
    def run_single_test(self, test_case):
        """Run individual test case"""
        try:
            # Execute the test
            output = self.assistant.process_input(test_case["input"])
            
            # Evaluate output
            evaluation = self.evaluate_output(
                output, 
                test_case["expected_criteria"]
            )
            
            return {
                "test_name": test_case["name"],
                "input": test_case["input"],
                "output": output,
                "evaluation": evaluation,
                "passed": evaluation["score"] >= test_case["pass_threshold"]
            }
            
        except Exception as e:
            return {
                "test_name": test_case["name"],
                "error": str(e),
                "passed": False
            }
    
    def evaluate_output(self, output, criteria):
        """Evaluate output against success criteria"""
        scores = {}
        
        for criterion, weight in criteria.items():
            score = self.evaluate_criterion(output, criterion)
            scores[criterion] = score * weight
            
        return {
            "scores": scores,
            "total_score": sum(scores.values()),
            "max_score": sum(criteria.values())
        }
```

---

## 📊 Performance Monitoring

### Metrics and Analytics
```python
class PerformanceMonitor:
    def __init__(self):
        self.metrics = {}
        self.logs = []
    
    def track_interaction(self, input_data, output_data, user_feedback=None):
        """Track individual interactions for analysis"""
        
        interaction = {
            "timestamp": datetime.now(),
            "input": input_data,
            "output": output_data,
            "feedback": user_feedback,
            "metrics": self.calculate_interaction_metrics(input_data, output_data)
        }
        
        self.logs.append(interaction)
        self.update_aggregate_metrics(interaction)
    
    def calculate_interaction_metrics(self, input_data, output_data):
        """Calculate metrics for a single interaction"""
        return {
            "response_time": output_data.get("processing_time", 0),
            "response_length": len(output_data.get("content", "")),
            "input_complexity": self.assess_input_complexity(input_data),
            "output_quality": self.assess_output_quality(output_data)
        }
    
    def generate_performance_report(self, time_period=None):
        """Generate comprehensive performance analysis"""
        
        filtered_logs = self.filter_logs_by_period(time_period)
        
        return {
            "summary": self.calculate_summary_metrics(filtered_logs),
            "trends": self.analyze_trends(filtered_logs),
            "issues": self.identify_issues(filtered_logs),
            "recommendations": self.generate_recommendations(filtered_logs)
        }
```

---

**Implementation guide created by Sayed Allam - June 2025**  
*Practical examples for real-world prompt implementation*
