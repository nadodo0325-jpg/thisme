type HistoryItem = {
  title: string;
  text: string;
  createdAt: string;
};

type Props = {
  items: HistoryItem[];
};

export default function HistoryList({
  items,
}: Props) {

  if (items.length === 0) {
    return null;
  }

  return (

    <div className="w-full max-w-md mt-16">

      <h3 className="text-xl font-bold mb-6">
        你的版本紀錄
      </h3>

      <div className="flex flex-col gap-4">

        {items.map((item, index) => (

          <div
            key={index}
            className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800"
          >

            <div className="flex justify-between items-start mb-3">

              <h4 className="font-semibold text-lg">
                {item.title}
              </h4>

              <p className="text-xs text-zinc-500">
                {item.createdAt}
              </p>

            </div>

            <p className="text-zinc-400 leading-relaxed">
              {item.text}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}