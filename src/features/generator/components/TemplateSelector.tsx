import { templates } from "@/lib/templates";

type Props = {
  current: keyof typeof templates;
  onChange: (
    template: keyof typeof templates
  ) => void;
};

export default function TemplateSelector({
  current,
  onChange,
}: Props) {

  return (

    <div className="flex gap-3 mt-8 flex-wrap justify-center">

      {Object.entries(templates).map(
        ([key, value]) => (

          <button
            key={key}
            onClick={() =>
              onChange(
                key as keyof typeof templates
              )
            }
            className={`
              px-4 py-2 rounded-full text-sm transition
              ${
                current === key
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800"
              }
            `}
          >
            {value.name}
          </button>
        )
      )}

    </div>

  );
}