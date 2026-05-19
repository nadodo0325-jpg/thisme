# RUNTIME RULES

Runtime stability is PRIORITY.

Must prevent:

- infinite loops
- hydration mismatch
- state race conditions
- render storms
- animation lag
- memory leaks

Preferred patterns:

- requestAnimationFrame
- throttled runtime
- Zustand direct update
- minimal React re-render

Avoid:

- heavy useEffect chains
- nested state updates
- global rerender triggers