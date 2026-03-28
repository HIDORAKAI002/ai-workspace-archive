# !/bin/bash

curl -s https://pypi.org/pypi/agentscope/json | python -c "import sys,json; print(json.load(sys.stdin)['info']['version'])"
