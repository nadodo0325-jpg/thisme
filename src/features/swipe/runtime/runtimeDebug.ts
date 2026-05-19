"use client";

type RuntimeEvent =
  | "RUNTIME_START"
  | "RUNTIME_TICK"
  | "RUNTIME_STOP"
  | "HYDRATION_START"
  | "HYDRATION_FINISH"
  | "STORE_UPDATE"
  | "UNIVERSE_EVENT"
  | "VECTOR_UPDATE"
  | "PAGE_RENDER";

const ENABLE_DEBUG =
  process.env.NODE_ENV ===
  "development";

export function runtimeDebug(
  event: RuntimeEvent,
  payload?: unknown
) {
  if (!ENABLE_DEBUG) {
    return;
  }

  const timestamp =
    performance.now().toFixed(1);

  console.log(
    `%c[FLUXY:${event}]`,
    "color:#a855f7;font-weight:bold",
    {
      t: `${timestamp}ms`,
      payload,
    }
  );
}