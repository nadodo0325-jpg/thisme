type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function InputBox({
  value,
  onChange,
}: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="你現在在想什麼？"
      className="w-full h-32 rounded-2xl bg-zinc-900 border border-zinc-800 p-4 resize-none outline-none"
    />
  );
}