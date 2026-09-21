import { expertiseAreas } from "@/lib/site-config";

export default function TrustAreas() {
  return (
    <section className="border-y border-ink-100 bg-white py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-sm font-bold tracking-wide text-ink-400">
          مجالات نفهمها
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {expertiseAreas.map((area) => (
            <span key={area} className="text-sm font-bold text-ink-700 sm:text-base">
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
