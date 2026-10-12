
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Search,
  RefreshCw,
} from "lucide-react";

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

type PriceValue =
  | number
  | string
  | {
      min?: number;
      max?: number;
      avg?: number;
      average?: number;
    };

type MarketProduct = {
  id: number | string;
  slug?: string;
  nameBn: string;
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit?: string;
  image?: string;
  today: PriceValue;
  yesterday?: PriceValue;
  lastWeek?: PriceValue;
  lastMonth?: PriceValue;
  change?: {
    dir?: "up" | "down" | "flat" | string;
    pct?: number;
  };
  markets?: {
    market?: string;
    division?: string;
    min?: number;
    max?: number;
  }[];
};

function toNumber(value: PriceValue | undefined): number {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (value && typeof value === "object") {
    if (typeof value.avg === "number") return value.avg;
    if (typeof value.average === "number") return value.average;

    if (
      typeof value.min === "number" &&
      typeof value.max === "number"
    ) {
      return (value.min + value.max) / 2;
    }

    if (typeof value.min === "number") return value.min;
    if (typeof value.max === "number") return value.max;
  }

  return 0;
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatChange(value: number | undefined): string {
  return `${formatPrice(Math.abs(value ?? 0))}%`;
}

function getEmoji(product: MarketProduct): string {
  if (product.categoryIcon) return product.categoryIcon;

  const category = `${product.category ?? ""} ${
    product.categoryNameBn ?? ""
  }`.toLowerCase();

  if (category.includes("চাল") || category.includes("rice")) return "🍚";
  if (category.includes("ডাল") || category.includes("lentil")) return "🫘";
  if (category.includes("তেল") || category.includes("oil")) return "🫙";
  if (category.includes("মাছ") || category.includes("fish")) return "🐟";
  if (category.includes("মাংস") || category.includes("meat")) return "🥩";
  if (category.includes("সবজি") || category.includes("vegetable")) return "🥬";
  if (category.includes("মসলা") || category.includes("spice")) return "🌶️";
  if (category.includes("ডিম") || category.includes("egg")) return "🥚";
  if (category.includes("দুধ") || category.includes("milk")) return "🥛";

  return "🛒";
}

function getPriceLabel(unit?: string): string {
  if (!unit) return "প্রতি একক";

  const normalized = unit.toLowerCase();

  if (normalized.includes("kg") || normalized.includes("কেজি")) {
    return `প্রতি ${unit}`;
  }

  if (normalized.includes("liter") || normalized.includes("লিটার")) {
    return `প্রতি ${unit}`;
  }

  return `প্রতি ${unit}`;
}

function ProductCard({ product }: { product: MarketProduct }) {
  const direction = product.change?.dir ?? "flat";
  const change = product.change?.pct ?? 0;
  const price = toNumber(product.today);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-3.5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm sm:p-4"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-2xl">
          {getEmoji(product)}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-[#202820] group-hover:text-[#078345]">
            {product.nameBn}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {getPriceLabel(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-0.5 text-lg font-extrabold text-[#202820]">
            ৳{formatPrice(price)}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold ${
            direction === "up"
              ? "bg-red-50 text-red-500"
              : direction === "down"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {direction === "up" ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : direction === "down" ? (
            <ArrowDownRight className="h-3.5 w-3.5" />
          ) : (
            <span>—</span>
          )}
          {formatChange(change)}
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
  products: MarketProduct[];
  falling?: boolean;
}) {
  if (products.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-[#202820]">
        <span className={falling ? "text-emerald-600" : "text-red-500"}>
          {falling ? "▼" : "▲"}
        </span>
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-4">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-3 w-1/3 rounded bg-gray-100" />
        </div>
      </div>
      <div className="mt-5 h-5 w-1/2 rounded bg-gray-200" />
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<MarketProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function loadProducts() {
  try {
    const response = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("পণ্যের তথ্য পাওয়া যায়নি।");
      }

      const result: unknown = await response.json();

      // API response array অথবা { data: [...] }—দুই format-ই handle করবে।
      let items: unknown[] = [];

      if (Array.isArray(result)) {
        items = result;
      } else if (
        result &&
        typeof result === "object" &&
        "data" in result &&
        Array.isArray(result.data)
      ) {
        items = result.data;
      }

      const validProducts = items.filter(
        (item): item is MarketProduct =>
          typeof item === "object" &&
          item !== null &&
          "id" in item &&
          "nameBn" in item &&
          "today" in item
      );

      if (validProducts.length === 0) {
        throw new Error(
          "API থেকে product list পাওয়া যায়নি। Response format পরীক্ষা করো।"
        );
      }

      setProducts(validProducts);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "একটি সমস্যা হয়েছে। আবার চেষ্টা করো।"
      );
    } finally {
      setLoading(false);
    }
  }

 useEffect(() => {
  void Promise.resolve().then(() => loadProducts());
}, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    if (!query) return products;

    return products.filter((product) => {
      const searchableText = [
        product.nameBn,
        product.categoryNameBn,
        product.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();

      return searchableText.includes(query);
    });
  }, [products, search]);

  const risingProducts = useMemo(
    () =>
      [...products]
        .filter((product) => product.change?.dir === "up")
        .sort(
          (a, b) =>
            Math.abs(b.change?.pct ?? 0) -
            Math.abs(a.change?.pct ?? 0)
        )
        .slice(0, 6),
    [products]
  );

  const fallingProducts = useMemo(
    () =>
      [...products]
        .filter((product) => product.change?.dir === "down")
        .sort(
          (a, b) =>
            Math.abs(b.change?.pct ?? 0) -
            Math.abs(a.change?.pct ?? 0)
        )
        .slice(0, 6),
    [products]
  );

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
              বাজারদরের তথ্য, দ্রুত খোঁজ এবং সহজ তুলনা।
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
          onSubmit={(event) => {
            event.preventDefault();
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-5 flex items-center gap-3 rounded-xl border border-[#dfe8df] bg-[#fbfcfa] p-3"
        >
          <Search className="h-5 w-5 shrink-0 text-gray-500" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="কোনো পণ্যের নাম খুঁজুন..."
            aria-label="পণ্য খুঁজুন"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800"
            >
              মুছুন
            </button>
          )}

          <button
            type="submit"
            className="rounded-lg bg-[#078345] px-4 py-2 text-sm font-semibold text-white hover:bg-[#066b38]"
          >
            খুঁজুন
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <section className="mt-8" aria-label="পণ্য লোড হচ্ছে">
            <div className="mb-4 h-5 w-40 animate-pulse rounded bg-gray-200" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </section>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            role="alert"
            className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
          >
            <p className="font-bold">পণ্যের তথ্য লোড করা যায়নি</p>
            <p className="mt-1">{error}</p>
            <button
              type="button"
              onClick={() => void loadProducts()}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              <RefreshCw className="h-4 w-4" />
              আবার চেষ্টা করো
            </button>
          </div>
        )}

        {/* Live price movement */}
        {!loading && !error && !search.trim() && (
          <>
            <ProductSection
              title="আজ দাম বেড়েছে"
              products={risingProducts}
            />

            <ProductSection
              title="আজ দাম কমেছে"
              products={fallingProducts}
              falling
            />
          </>
        )}

        {/* All products */}
        <section id="products" className="mt-9 scroll-mt-6">
          <div className="mb-4">
            <h2 className="text-lg font-extrabold text-[#202820]">
              {search.trim() ? "খোঁজের ফলাফল" : "সব পণ্য"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {search.trim()
                ? `মোট ${formatPrice(filteredProducts.length)}টি পণ্য পাওয়া গেছে`
                : `মোট ${formatPrice(products.length)}টি পণ্যের তালিকা`}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : !error && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : !error ? (
            <div className="rounded-2xl border border-dashed border-[#cbd8cb] bg-[#fbfcfa] px-4 py-10 text-center">
              <p className="text-3xl">🔎</p>
              <h3 className="mt-3 font-bold text-[#202820]">
                কোনো পণ্য পাওয়া যায়নি
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                অন্য কোনো নাম দিয়ে খুঁজে দেখো।
              </p>
            </div>
          ) : null}
        </section>

        {!loading && !error && (
          <p className="mt-6 rounded-xl border border-[#dfe8df] bg-[#fbfcfa] px-4 py-3 text-xs leading-5 text-gray-600">
            প্রদর্শিত দাম ও পরিবর্তনের তথ্য BazarDor API থেকে নেওয়া হয়েছে।
            বাজারে কেনাকাটার আগে স্থানীয় বিক্রেতার কাছ থেকে দাম যাচাই করে নাও।
          </p>
        )}
      </div>
    </main>
  );
}
