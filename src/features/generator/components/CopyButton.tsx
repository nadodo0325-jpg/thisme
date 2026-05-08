type Props = {
  text: string;
};

export default function CopyButton({
  text,
}: Props) {

  const copyText = async () => {

    try {

      await navigator.clipboard.writeText(
        text
      );

      alert("已複製文案");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <button
      onClick={copyText}
      className="bg-white text-black px-6 py-3 rounded-2xl font-medium hover:opacity-90 transition"
    >
      複製文案
    </button>

  );
}