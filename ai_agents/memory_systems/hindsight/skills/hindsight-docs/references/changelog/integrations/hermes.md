---
hide_table_of_contents: true
---

# Hermes Integration Changelog

Changelog for [`hindsight-hermes`](https://pypi.org/project/hindsight-hermes/).

For the source code, see [`hindsight-integrations/hermes`](https://github.com/vectorize-io/hindsight/tree/main/hindsight-integrations/hermes).

← [Back to main changelog](../index.md)

## [0.5.0](https://github.com/vectorize-io/hindsight/tree/integrations/hermes/v0.5.0)

**Features**

- Added the Hermes Agent integration for Hindsight. ([`ef90842f`](https://github.com/vectorize-io/hindsight/commit/ef90842f))

**Improvements**

- Enabled file-based configuration for the Hermes integration. ([`0ff36548`](https://github.com/vectorize-io/hindsight/commit/0ff36548))

**Bug Fixes**

- Fixed potential event loop deadlocks by using asynchronous Hermes client calls. ([`35dfd3aa`](https://github.com/vectorize-io/hindsight/commit/35dfd3aa))
- Synchronized lifecycle hook behavior for compatibility with hermes-agent 0.5.0. ([`e7c9a683`](https://github.com/vectorize-io/hindsight/commit/e7c9a683))
