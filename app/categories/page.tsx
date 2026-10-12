
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সব ক্যাটাগরি",
  description: "বাজারদরের সব পণ্যের ক্যাটাগরি দেখুন।",
};

const categories = [
  { slug: "chal", name: "চাল", icon: "🍚", description: "বিভিন্ন ধরনের চালের বাজারদর" },
  { slug: "dal", name: "ডাল", icon: "🫘", description: "বিভিন্ন ধরনের ডালের বাজারদর" },
  { slug: "tel", name: "তেল", icon: "🛢️", description: "ভোজ্য তেলের বাজারদর" },
  { slug: "sobji", name: "সবজি", icon: "🥬", description: "তাজা সবজির বাজারদর" },
  { slug: "mach", name: "মাছ", icon: "🐟", description: "বিভিন্ন মাছের বাজারদর" },
  { slug: "mangsho", name: "মাংস", icon: "🍗", description: "মাংসের বাজারদর" },
  { slug: "dim-dui", name: "ডিম-দুধ", icon: "🥛", description: "ডিম ও দুগ্ধজাত পণ্যের বাজারদর" },
  { slug: "mosla", name: "মসলা", icon: "🌶️", description: "বিভিন্ন মসলার বাজারদর" },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen flex-1 bg-[#f0f5f0]">
      <div className="container-bazardor py-8 sm:py-10">
        <div className="rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-6 sm:p-8">
          <span className="inline-flex rounded-full bg-[#e6f4e9] px-3 py-1 text-xs font-semibold text-[#078345]">
            বাজারদর ক্যাটাগরি
          </span>

          <h1 className="mt-3 text-2xl font-extrabold text-[#202820] sm:text-3xl">
            সব ক্যাটাগরি
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
            তোমার প্রয়োজনীয় পণ্যের ক্যাটাগরি নির্বাচন করে বাজারদর দেখো।
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f5ef] text-3xl">
                {category.icon}
              </div>

              <h2 className="mt-4 text-lg font-extrabold text-[#202820] group-hover:text-[#078345]">
                {category.name}
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                {category.description}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#078345]">
                পণ্য দেখুন <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
