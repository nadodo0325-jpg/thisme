type Props = {
  onClick: () => void;
};

export default function GenerateButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="mt-6 bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:opacity-80 transition"
    >
      生成我的這版
    </button>
  );
}