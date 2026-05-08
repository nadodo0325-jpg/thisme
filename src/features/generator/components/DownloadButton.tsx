type Props = {
  onClick: () => void;
};

export default function DownloadButton({
  onClick,
}: Props) {

  return (
    <button
      onClick={onClick}
      className="
        rounded-2xl
        bg-white
        px-5
        py-3
        font-semibold
        text-black
        transition-all
        hover:scale-105
        active:scale-95
      "
    >
      下載 IG 圖卡
    </button>
  );
}