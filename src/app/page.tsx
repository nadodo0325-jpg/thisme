import Link from "next/link";

const liveFeed = [
  {
    title: "今晚最多人壓住的情緒",
    value: "「其實我沒有看起來那麼無所謂」",
  },
  {
    title: "late night emotional trend",
    value: "已讀焦慮 ↑ 42%",
  },
  {
    title: "現在最多人卡住的關係",
    value: "忽冷忽熱",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.16),transparent_40%)]" />

      <div className="absolute left-1/2 top-[15%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="absolute bottom-[-120px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* NOISE */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          pointer-events-none
          mix-blend-screen
        "
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-2xl
          flex-col
          px-5
          pb-10
          pt-6
        "
      >
        {/* TOP BAR */}

        <div className="flex items-center justify-between">
          <div>
            <h1
              className="
                text-[2rem]
                font-semibold
                tracking-[0.35em]
                text-white
              "
            >
              FLUXY
            </h1>

            <p
              className="
                mt-2
                text-xs
                tracking-[0.18em]
                uppercase
                text-white/30
              "
            >
              emotional social experience
            </p>
          </div>

          <div
            className="
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-3
              py-1.5
              text-[11px]
              tracking-[0.2em]
              text-emerald-300
              backdrop-blur-xl
            "
          >
            LIVE
          </div>
        </div>

        {/* HERO */}

        <section className="mt-20">
          <div className="space-y-5">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-2
                text-[11px]
                tracking-[0.22em]
                uppercase
                text-white/45
                backdrop-blur-xl
              "
            >
              <div className="h-2 w-2 rounded-full bg-white/70" />

              emotional scan
            </div>

            <div className="space-y-4">
              <h2
                className="
                  max-w-xl
                  text-[3.2rem]
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.04em]
                  text-white
                  sm:text-[4.2rem]
                "
              >
                大部分的人，
                <br />
                其實都沒自己
                <br />
                想像中快樂。
              </h2>

              <p
                className="
                  max-w-md
                  text-base
                  leading-relaxed
                  text-white/45
                "
              >
                FLUXY 會根據你的情緒直覺，
                解析你現在最真實的人格狀態。
              </p>
            </div>

            {/* CTA */}

            <div className="flex flex-col gap-4 pt-3">
              <Link
                href="/flux"
                className="
                  group
                  inline-flex
                  h-14
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-white
                  px-7
                  text-sm
                  font-medium
                  text-black
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                進入 FLUXY

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>

              <p
                className="
                  text-sm
                  leading-relaxed
                  text-white/28
                "
              >
                已有 42,000+ 人完成今晚的情緒解析
              </p>
            </div>
          </div>
        </section>

        {/* LIVE FEED */}

        <section className="mt-20">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-white/35">
              此刻最多人共鳴的情緒
            </p>

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.25em]
                text-white/20
              "
            >
              live feed
            </p>
          </div>

          <div className="space-y-4">
            {liveFeed.map((item) => (
              <div
                key={item.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-5
                  backdrop-blur-2xl
                  transition-all
                  duration-300
                  hover:border-white/15
                  hover:bg-white/[0.06]
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]
                  "
                />

                <div className="relative z-10">
                  <p className="text-sm text-white/35">
                    {item.title}
                  </p>

                  <h3
                    className="
                      mt-3
                      text-xl
                      font-medium
                      leading-relaxed
                      tracking-tight
                      text-white/90
                    "
                  >
                    {item.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}

        <div className="mt-auto pt-16 text-center">
          <p
            className="
              text-sm
              leading-relaxed
              text-white/22
            "
          >
            不是心理測驗。
            <br />
            是這個世代正在同步的情緒流動。
          </p>
        </div>
      </div>
    </main>
  );
}