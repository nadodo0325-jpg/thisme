# CONTEXT RULES

Free models have limited context.

Always avoid:

- scanning node_modules
- scanning .next
- scanning entire repo
- analyzing all src

Only load:

- relevant feature
- relevant runtime
- relevant component

Maximum scope:

ONE FLOW ONLY.