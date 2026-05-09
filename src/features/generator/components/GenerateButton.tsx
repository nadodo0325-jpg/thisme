type Props = {
  onClick: () => void;

  loading?: boolean;
};

export default function GenerateButton({
  onClick,
  loading = false,
}: Props) {

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        group
        relative
        mt-2
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        px-6
        py-5
        transition-all
        duration-300
        backdrop-blur-2xl
        ${
          loading
            ? `
              cursor-not-allowed
              bg-white/10
              opacity-70
            `
            : `
              bg-gradient-to-r
              from-purple-500
              via-pink-500
              to-cyan-500
              hover:scale-[1.015]
              hover:shadow-[0_0_60px_rgba(168,85,247,0.45)]
              active:scale-[0.99]
            `
        }
      `}
    >

      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      >

        <div className="absolute left-0 top-0 h-full w-1/2 bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-full w-1/2 bg-pink-400/20 blur-3xl" />

      </div>

      {/* Shine */}
      {!loading && (
        <div
          className="
            absolute
            inset-y-0
            -left-[30%]
            w-[30%]
            rotate-12
            bg-white/20
            blur-2xl
            transition-all
            duration-1000
            group-hover:left-[120%]
          "
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4">

        {/* Loading */}
        {loading ? (

          <div
            className="
              h-5
              w-5
              animate-spin
              rounded-full
              border-2
              border-white/30
              border-t-white
            "
          />

        ) : (

          <div className="text-2xl">
            ✦
          </div>

        )}

        <div className="text-left">

          <div className="text-lg font-black tracking-tight text-white">

            {loading
              ? "AI 正在生成你的人格..."
              : "生成我的人格版本"}

          </div>

          <div className="mt-1 text-xs tracking-[0.18em] text-white/70">

            {loading
              ? "THISME ANALYZING"
              : "GENERATE 3 PERSONALITIES"}

          </div>

        </div>

      </div>

    </button>
  );
}