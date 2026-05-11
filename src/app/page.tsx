import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">
          FLUXY
        </h1>

        <p className="text-zinc-400">
          Enter your emotional flux.
        </p>

        <Link
          href="/flux"
          className="px-6 py-3 rounded-full bg-white text-black"
        >
          Enter Flux
        </Link>
      </div>
    </main>
  );
}