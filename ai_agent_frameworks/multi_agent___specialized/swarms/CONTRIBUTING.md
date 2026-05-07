# Contribution Guidelines

<div align="left">
  <a href="https://swarms.world">
    <img src="https://github.com/kyegomez/swarms/blob/master/images/new_logo.png" style="margin: 15px; max-width: 500px" width="50%" alt="Swarms Logo">
  </a>
</div>

<p align="left">
  <em>The Enterprise-Grade Production-Ready Multi-Agent Orchestration Framework</em>
</p>


## Project Overview

**Swarms** is an enterprise-grade, production-ready multi-agent orchestration framework focused on making it simple to orchestrate agents to automate real-world activities. The goal is to automate the world economy with these swarms of agents.

### Key Features

| Category | Features | Benefits |
|----------|----------|-----------|
| 🏢 Enterprise Architecture | • Production-Ready Infrastructure<br>• High Reliability Systems<br>• Modular Design<br>• Comprehensive Logging | • Reduced downtime<br>• Easier maintenance<br>• Better debugging<br>• Enhanced monitoring |
| 🤖 Agent Orchestration | • Hierarchical Swarms<br>• Parallel Processing<br>• Sequential Workflows<br>• Graph-based Workflows<br>• Dynamic Agent Rearrangement | • Complex task handling<br>• Improved performance<br>• Flexible workflows<br>• Optimized execution |
| 🔄 Integration Capabilities | • Multi-Model Support<br>• Custom Agent Creation<br>• Extensive Tool Library<br>• Multiple Memory Systems | • Provider flexibility<br>• Custom solutions<br>• Extended functionality<br>• Enhanced memory management |

### We Need Your Help To:

- **Write Tests**: Ensure the reliability and correctness of the codebase
- **Improve Documentation**: Maintain clear and comprehensive documentation
- **Add New Orchestration Methods**: Add multi-agent orchestration methods
- **Remove Defunct Code**: Clean up and remove bad code
- **Enhance Agent Capabilities**: Improve existing agents and add new ones
- **Optimize Performance**: Improve speed and efficiency of swarm operations

Your contributions will help us push the boundaries of AI and make this library a valuable resource for the community.

---

## Getting Started

### Installation

#### Using pip
```bash
pip3 install -U swarms
```

#### Using uv (Recommended)
[uv](https://github.com/astral-sh/uv) is a fast Python package installer and resolver, written in Rust.

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install swarms using uv
uv pip install swarms
```

#### Using poetry
```bash
# Install poetry if you haven't already
curl -sSL https://install.python-poetry.org | python3 -

# Add swarms to your project
poetry add swarms
```

#### From source
```bash
# Clone the repository
git clone https://github.com/kyegomez/swarms.git
cd swarms

# Install with pip
pip install -e .
```

### Environment Configuration

Create a `.env` file in your project root with the following variables:

```bash
OPENAI_API_KEY=""
WORKSPACE_DIR="agent_workspace"
ANTHROPIC_API_KEY=""
GROQ_API_KEY=""
```

- [Learn more about environment configuration here](https://docs.swarms.world/environment-setup)

### Project Structure

- **`swarms/`**: Contains all the source code for the library
  - **`agents/`**: Agent implementations and base classes
  - **`structs/`**: Swarm orchestration structures (SequentialWorkflow, AgentRearrange, etc.)
  - **`tools/`**: Tool implementations and base classes
  - **`prompts/`**: System prompts and prompt templates
  - **`utils/`**: Utility functions and helpers
- **`examples/`**: Includes example scripts and notebooks demonstrating how to use the library
- **`tests/`**: Unit tests for the library
- **`docs/`**: Documentation files and guides

---

## How to Contribute

### Reporting Issues

If you find any bugs, inconsistencies, or have suggestions for enhancements, please open an issue on GitHub:

1. **Search Existing Issues**: Before opening a new issue, check if it has already been reported.
2. **Open a New Issue**: If it hasn't been reported, create a new issue and provide detailed information.
   - **Title**: A concise summary of the issue.
   - **Description**: Detailed description, steps to reproduce, expected behavior, and any relevant logs or screenshots.
3. **Label Appropriately**: Use labels to categorize the issue (e.g., bug, enhancement, documentation).

**Issue Templates**: Use our issue templates for bug reports and feature requests:
- [Bug Report](https://github.com/kyegomez/swarms/issues/new?template=bug_report.md)
- [Feature Request](https://github.com/kyegomez/swarms/issues/new?template=feature_request.md)

### Submitting Pull Requests

We welcome pull requests (PRs) for bug fixes, improvements, and new features. Please follow these guidelines:

1. **Fork the Repository**: Create a personal fork of the repository on GitHub.
2. **Clone Your Fork**: Clone your forked repository to your local machine.

   ```bash
   git clone https://github.com/kyegomez/swarms.git
   cd swarms
   ```

3. **Create a New Branch**: Use a descriptive branch name.

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**: Implement your code, ensuring it adheres to the coding standards.
5. **Add Tests**: Write tests to cover your changes.
6. **Commit Your Changes**: Write clear and concise commit messages.

   ```bash
   git commit -am "Add feature X"
   ```

7. **Push to Your Fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**:

   - Go to the original repository on GitHub.
   - Click on "New Pull Request".
   - Select your branch and create the PR.
   - Provide a clear description of your changes and reference any related issues.

9. **Respond to Feedback**: Be prepared to make changes based on code reviews.

**Note**: It's recommended to create small and focused PRs for easier review and faster integration.

### Good First Issues

The easiest way to contribute is to pick any issue with the `good first issue` tag 💪. These are specifically designed for new contributors:

- [Good First Issues](https://github.com/kyegomez/swarms/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
- [Contributing Board](https://github.com/users/kyegomez/projects/1) - Participate in Roadmap discussions!

---

## Coding Standards

To maintain code quality and consistency, please adhere to the following standards.

### Type Annotations

- **Mandatory**: All functions and methods must have type annotations.
- **Example**:

  ```python
  def add_numbers(a: int, b: int) -> int:
      return a + b
  ```

- **Benefits**:
  - Improves code readability.
  - Helps with static type checking tools.

### Docstrings and Documentation

- **Docstrings**: Every public class, function, and method must have a docstring following the [Google Python Style Guide](http://google.github.io/styleguide/pyguide.html#38-comments-and-docstrings) or [NumPy Docstring Standard](https://numpydoc.readthedocs.io/en/latest/format.html).
- **Content**:
  - **Description**: Briefly describe what the function or class does.
  - **Args**: List and describe each parameter.
  - **Returns**: Describe the return value(s).
  - **Raises**: List any exceptions that are raised.

- **Example**:

  ```python
  def calculate_mean(values: List[float]) -> float:
      """
      Calculates the mean of a list of numbers.

      Args:
          values (List[float]): A list of numerical values.

      Returns:
          float: The mean of the input values.

      Raises:
          ValueError: If the input list is empty.
      """
      if not values:
          raise ValueError("The input list is empty.")
      return sum(values) / len(values)
  ```

- **Documentation**: Update or create documentation pages if your changes affect the public API.

### Testing

- **Required**: All new features and bug fixes must include appropriate unit tests.
- **Framework**: Use `unittest`, `pytest`, or a similar testing framework.
- **Test Location**: Place tests in the `tests/` directory, mirroring the structure of `swarms/`.
- **Test Coverage**: Aim for high test coverage to ensure code reliability.
- **Running Tests**: Provide instructions for running tests.

  ```bash
  pytest tests/
  ```

### Code Style

- **PEP 8 Compliance**: Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guidelines.
- **Linting Tools**: Use `flake8`, `black`, or `pylint` to check code style.
- **Consistency**: Maintain consistency with the existing codebase.

---

## Areas Needing Contributions

We have several areas where contributions are particularly welcome.

### Writing Tests

- **Goal**: Increase test coverage to ensure the library's robustness.
- **Tasks**:
  - Write unit tests for existing code in `swarms/`.
  - Identify edge cases and potential failure points.
  - Ensure tests are repeatable and independent.
  - Add integration tests for swarm orchestration methods.

### Improving Documentation

- **Goal**: Maintain clear and comprehensive documentation for users and developers.
- **Tasks**:
  - Update docstrings to reflect any changes.
  - Add examples and tutorials in the `examples/` directory.
  - Improve or expand the content in the `docs/` directory.
  - Create video tutorials and walkthroughs.

### Adding New Swarm Architectures

- **Goal**: Provide new multi-agent orchestration methods.
- **Current Architectures**:
  - [SequentialWorkflow](https://docs.swarms.world/api/sequential-workflow)
  - [AgentRearrange](https://docs.swarms.world/api/agent-rearrange)
  - [MixtureOfAgents](https://docs.swarms.world/api/mixture-of-agents)
  - [SpreadSheetSwarm](https://docs.swarms.world/api/spreadsheet-swarm)
  - [ForestSwarm](https://docs.swarms.world/api/forest-swarm)
  - [GraphWorkflow](https://docs.swarms.world/api/graph-workflow)
  - [GroupChat](https://docs.swarms.world/api/group-chat)
  - [SwarmRouter](https://docs.swarms.world/api/swarm-router)

### Enhancing Agent Capabilities

- **Goal**: Improve existing agents and add new specialized agents.
- **Areas of Focus**:
  - Financial analysis agents
  - Medical diagnosis agents
  - Code generation and review agents
  - Research and analysis agents
  - Creative content generation agents

### Removing Defunct Code

- **Goal**: Clean up and remove bad code to improve maintainability.
- **Tasks**:
  - Identify unused or deprecated code.
  - Remove duplicate implementations.
  - Simplify complex functions.
  - Update outdated dependencies.

---

## Development Resources

### Documentation

- **Official Documentation**: [docs.swarms.world](https://docs.swarms.world)
- **Installation Guide**: [Installation](https://docs.swarms.world/installation)
- **Quickstart Guide**: [Get Started](https://docs.swarms.world/quickstart)
- **Agent Architecture**: [Agent Internal Mechanisms](https://docs.swarms.world/concepts/agents)
- **Agent API**: [Agent API](https://docs.swarms.world/api/agent)

### Examples and Tutorials

- **Basic Examples**: [examples/](https://github.com/kyegomez/swarms/tree/master/examples)
- **Agent Examples**: [examples/single_agent/](https://github.com/kyegomez/swarms/tree/master/examples/single_agent)
- **Multi-Agent Examples**: [examples/multi_agent/](https://github.com/kyegomez/swarms/tree/master/examples/multi_agent)
- **Tool Examples**: [examples/tools/](https://github.com/kyegomez/swarms/tree/master/examples/tools)

### API Reference

- **Core Classes**: [swarms/structs/](https://github.com/kyegomez/swarms/tree/master/swarms/structs)
- **Agent Implementations**: [swarms/agents/](https://github.com/kyegomez/swarms/tree/master/swarms/agents)
- **Tool Implementations**: [swarms/tools/](https://github.com/kyegomez/swarms/tree/master/swarms/tools)
- **Utility Functions**: [swarms/utils/](https://github.com/kyegomez/swarms/tree/master/swarms/utils)

---

## Community and Support

### Connect With Us

| Platform | Link | Description |
|----------|------|-------------|
| 📚 Documentation | [docs.swarms.world](https://docs.swarms.world) | Official documentation and guides |
| 📝 Blog | [Medium](https://medium.com/@kyeg) | Latest updates and technical articles |
| 💬 Discord | [Join Discord](https://discord.gg/EamjgSaEQf) | Live chat and community support |
| 🐦 Twitter | [@kyegomez](https://twitter.com/kyegomez) | Latest news and announcements |
| 👥 LinkedIn | [The Swarm Corporation](https://www.linkedin.com/company/the-swarm-corporation) | Professional network and updates |
| 📺 YouTube | [Swarms Channel](https://www.youtube.com/channel/UC9yXyitkbU_WSy7bd_41SqQ) | Tutorials and demos |
| 🎫 Events | [Sign up here](https://lu.ma/swarms_calendar) | Join our community events |

### Onboarding Session

Get onboarded with the creator and lead maintainer of Swarms, Kye Gomez, who will show you how to get started with the installation, usage examples, and starting to build your custom use case! [CLICK HERE](https://cal.com/swarms/swarms-onboarding-session)

### Community Guidelines

- **Communication**: Engage with the community by participating in discussions on issues and pull requests.
- **Respect**: Maintain a respectful and inclusive environment.
- **Feedback**: Be open to receiving and providing constructive feedback.
- **Collaboration**: Work together to improve the project for everyone.

---

## License

By contributing to swarms, you agree that your contributions will be licensed under the [Apache License](LICENSE).

---

## Citation

If you use **swarms** in your research, please cite the project by referencing the metadata in [CITATION.cff](./CITATION.cff).

---

Thank you for contributing to swarms! Your efforts help make this project better for everyone.

If you have any questions or need assistance, please feel free to:
- Open an issue on GitHub
- Join our Discord community
- Reach out to the maintainers
- Schedule an onboarding session

**Happy contributing! 🚀**