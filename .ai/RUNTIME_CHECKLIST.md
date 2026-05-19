# RUNTIME CHECKLIST

For every:

- requestAnimationFrame
- useEffect
- setInterval
- animation loop
- motion system

CHECK:

1. cleanup
2. stale closure
3. memory leak
4. duplicated subscription
5. infinite render risk
6. hydration mismatch
7. async race condition

---

For Zustand:

CHECK:
- unnecessary re-render
- selector stability
- persist hydration timing