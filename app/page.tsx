
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Search,
} from "lucide-react";

const risingProducts = [
  { name: "পেঁয়াজ", emoji: "🧅", price: "৪৮", change: "২.৬%" },
  { name: "আলু", emoji: "🥔", price: "৩৮", change: "২.০%" },
  { name: "বেগুন", emoji: "🍆", price: "৪৪", change: "৪.১%" },
  { name: "রুই মাছ", emoji: "🐟", price: "৪৬০", change: "৪.৪%" },
  { name: "ডিম", emoji: "🥚", price: "১৫৮", change: "১.৩%" },
  { name: "সয়াবিন তেল", emoji: "🫒", price: "১৮৫", change: "০.৬%" },
];

const fallingProducts = [
  { name: "কাঁচামরিচ", emoji: "🌶️", price: "৯১", change: "২.৮%" },
  { name: "রসুন", emoji: "🧄", price: "৮৪", change: "১.৮%" },
  { name: "আলু", emoji: "🥔", price: "৩০", change: "১.৫%" },
  { name: "কাতলা মাছ", emoji: "🐠", price: "৪৩০", change: "০.৮%" },
  { name: "ইলিশ মাছ", emoji: "🐟", price: "১,৮৩০", change: "১.৬%" },
  { name: "খাসির মাংস", emoji: "🍖", price: "১,১৯০", change: "০.৯%" },
];

const allProducts = [
  { name: "স্বর্ণচিনি চাল", emoji: "🍚", price: "১৪৮", change: "২.৬%", up: true },
  { name: "মিনিকেট চাল", emoji: "🍚", price: "৯৯", change: "২.৯%", up: false },
  { name: "নাজিরশাইল চাল", emoji: "🍚", price: "৭৮", change: "০.০%", up: null },
  { name: "বাটাম সাইজ চাল", emoji: "🍚", price: "৬৬", change: "০.৬%", up: true },
  { name: "মসুর ডাল", emoji: "🫘", price: "১৪২", change: "১.৯%", up: true },
  { name: "মুগ ডাল", emoji: "🫘", price: "১৩৫", change: "০.০%", up: null },
  { name: "ছোলা", emoji: "🫘", price: "১২০", change: "১.৪%", up: false },
  { name: "আমন ডাল", emoji: "🫘", price: "৮০", change: "২.০%", up: true },
  { name: "সরিষার তেল", emoji: "🫙", price: "১৮০", change: "১.৫%", up: true },
  { name: "পাম তেল", emoji: "🛢️", price: "১৬৮", change: "১.০%", up: true },
  { name: "আলু", emoji: "🥔", price: "৩০", change: "১.৫%", up: false },
  { name: "পেঁয়াজ", emoji: "🧅", price: "৪৮", change: "২.৬%", up: true },
  { name: "কাঁচামরিচ", emoji: "🌶️", price: "৯১", change: "২.৮%", up: false },
  { name: "বেগুন", emoji: "🍆", price: "৪৪", change: "৪.১%", up: true },
  { name: "টমেটো", emoji: "🍅", price: "৩৮", change: "০.০%", up: null },
  { name: "রুই মাছ", emoji: "🐟", price: "৪৬০", change: "৪.৪%", up: true },
  { name: "তেলাপিয়া", emoji: "🐟", price: "৩৬০", change: "০.০%", up: null },
  { name: "চিংড়ি মাছ", emoji: "🦐", price: "৩৩০", change: "০.৬%", up: true },
  { name: "কাতলা মাছ", emoji: "🐠", price: "৪৩০", change: "০.৮%", up: false },
  { name: "মুরগির মাংস", emoji: "🍗", price: "২২৫", change: "১.০%", up: false },
  { name: "গরুর মাংস", emoji: "🥩", price: "৭৯০", change: "১.৫%", up: false },
  { name: "খাসির মাংস", emoji: "🍖", price: "১,১৯০", change: "০.৯%", up: true },
  { name: "ডিম", emoji: "🥚", price: "১৫৮", change: "১.৩%", up: true },
  { name: "দুধ", emoji: "🥛", price: "১০২", change: "১.০%", up: true },
];

function ProductCard({
  product,
}: {
  product: {
    name: string;
    emoji: string;
    price: string;
    change: string;
    up: boolean | null;
  };
}) {
  return (
    <Link
      href="/#products"
      className="group rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-3.5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-sm sm:p-4"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-2xl">
          {product.emoji}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-bold text-[#202820] group-hover:text-[#078345]">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">প্রতি কেজি</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-0.5 text-lg font-extrabold text-[#202820]">
            ৳{product.price} <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold ${
            product.up === true
              ? "bg-red-50 text-red-500"
              : product.up === false
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {product.up === true ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : product.up === false ? (
            <ArrowDownRight className="h-3.5 w-3.5" />
          ) : (
            "—"
          )}
          {product.change}
        </span>
      </div>
    </Link>
  );
}

function ProductSection({
  title,
  products,
  falling = false,
}: {
  title: string;
  products: {
    name: string;
    emoji: string;
    price: string;
    change: string;
  }[];
  falling?: boolean;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-[#202820]">
        <span className={falling ? "text-emerald-600" : "text-red-500"}>
          {falling ? "▼" : "▲"}
        </span>
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard
            key={`${product.name}-${index}`}
            product={{
              ...product,
              up: falling ? false : true,
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex-1 bg-[#f0f5f0]">
      <div className="container-bazardor pb-12 pt-6 sm:pt-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] px-5 py-7 sm:px-8 sm:py-9 lg:flex lg:min-h-[185px] lg:items-center lg:justify-between">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex rounded-full bg-[#e6f4e9] px-3 py-1 text-xs font-semibold text-[#078345]">
              বাংলাদেশের বাজারদর
            </span>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#202820] sm:text-3xl">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারদরভিত্তিক তথ্য, দ্রুত খোঁজ এবং সহজ তুলনার অভিজ্ঞতা।
            </p>
            <a
              href="#products"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#078345] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066b38]"
            >
              সব পণ্য দেখুন <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-5 flex items-center justify-center lg:mt-0 lg:w-[30%]">
            <div className="flex h-28 w-36 items-center justify-center rounded-2xl bg-[#f0f6ee] text-7xl sm:h-32 sm:w-40">
              🧺
            </div>
          </div>
        </section>

        {/* Search */}
        <form
          action="#products"
          className="mt-5 flex items-center gap-3 rounded-xl border border-[#dfe8df] bg-[#fbfcfa] p-3"
        >
          <Search className="h-5 w-5 shrink-0 text-gray-500" />
          <input
            type="search"
            name="search"
            placeholder="কোনো পণ্যের নাম খুঁজুন..."
            aria-label="পণ্য খুঁজুন"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#078345] px-4 py-2 text-sm font-semibold text-white hover:bg-[#066b38]"
          >
            খুঁজুন
          </button>
        </form>

        {/* Price movement sections */}
        <ProductSection title="আজ দাম বেড়েছে" products={risingProducts} />
        <ProductSection
          title="আজ দাম কমেছে"
          products={fallingProducts}
          falling
        />

        {/* All products */}
        <section id="products" className="mt-9 scroll-mt-6">
          <div className="mb-4">
            <h2 className="text-lg font-extrabold text-[#202820]">
              সব পণ্য
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              বাজারদরের পণ্য তালিকা
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allProducts.map((product, index) => (
              <ProductCard key={`${product.name}-${index}`} product={product} />
            ))}
          </div>
        </section>

        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
          নোট: এই ধাপের দামগুলো শুধুমাত্র UI preview-এর জন্য। এগুলো live market
          price নয়। API integration-এর পর উপলব্ধ প্রকৃত তথ্য দেখানো হবে।
        </p>
      </div>
    </main>
  );
}
