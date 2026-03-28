---
name: "python-flask-json-guide-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-flask-json-guide-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
This project is heavily reliant on our custom Drawscape Factorio python module.

Here is code examples of how to use the module:

```python
from drawscape_factorio import create as createFactorio
from drawscape_factorio import importFUE5

with open('/path/to/exported-entities.json', 'r') as file:
    json_data = json.load(file)
    data = importFUE5(json_data)
    result = createFactorio(data, {
        'theme_name': 'default',
        'color_scheme': 'main',
        'show_layers': ['assets', 'belts', 'walls', 'rails', 'electrical', 'spaceship']
    })

with open(output_file_name, 'w') as f:
    f.write(result['svg_string'])


```