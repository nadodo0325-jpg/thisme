type Props = {
  onClick: () => void;
};

export default function DownloadButton({
  onClick,
}: Props) {

  return (

    <button
      onClick={onClick}
      className="bg-zinc-900 border border-zinc-700 text-zinc-200 px-6 py-3 rounded-2xl hover:bg-zinc-800 transition"
    >
      下載 Story
    </button>

  );
}