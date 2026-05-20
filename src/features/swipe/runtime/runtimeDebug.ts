export function runtimeDebug(
  label: string,
  payload?: unknown
) {
  /*
    production safe
  */

  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  /*
    enable debug
  */

  const ENABLE_DEBUG =
    true;

  if (!ENABLE_DEBUG) {
    return;
  }

  const timestamp =
    new Date().toLocaleTimeString();

  /*
    grouped debug log
  */

  console.log(
    `%c[FLUXY:${label}]`,
    "color:#a855f7;font-weight:bold;",
    {
      time: timestamp,

      payload,
    }
  );
}