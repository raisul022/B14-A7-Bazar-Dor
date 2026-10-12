
"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";

const API_BASE = "https://openapi.programming-hero.com/api/bazardor";

type PriceValue =
  | number
  | string
  | {
      min?: number;
      max?: number;
      avg?: number;
      average?: number;
    };

type Product = {
  id: string | number;
  slug?: string;
  nameBn: string;
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit?: string;
  today: PriceValue;
  change?: {
    dir?: string;
    pct?: number;
  };
};

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

function getPrice(value: PriceValue | undefined): number {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
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

function formatNumber(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

function ProductCard({ product }: { product: Product }) {
  const direction = product.change?.dir ?? "flat";
  const change = product.change?.pct ?? 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-2xl">
          {product.categoryIcon || "🛒"}
        </span>

        <div className="min-w-0">
          <h2 className="truncate font-bold text-[#202820] group-hover:text-[#078345]">
            {product.nameBn}
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            {product.unit ? `প্রতি ${product.unit}` : "প্রতি একক"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-lg font-extrabold text-[#202820]">
            ৳{formatNumber(getPrice(product.today))}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
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
            "—"
          )}
          {formatNumber(Math.abs(change))}%
        </span>
      </div>
    </Link>
  );
}

function CategoryProductsContent() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
const loadCategory = useCallback(async () => {
  try {
    const [categoryResponse, productResponse] = await Promise.all([
      fetch(`${API_BASE}/categories`, { cache: "no-store" }),
      fetch(`${API_BASE}/products`, { cache: "no-store" }),
    ]);

    if (!categoryResponse.ok || !productResponse.ok) {
      throw new Error("সার্ভার থেকে তথ্য পাওয়া যায়নি।");
    }

    const categoryData: unknown = await categoryResponse.json();
    const productData: unknown = await productResponse.json();

    const categoryList: unknown[] = Array.isArray(categoryData)
      ? categoryData
      : categoryData &&
          typeof categoryData === "object" &&
          "data" in categoryData &&
          Array.isArray(categoryData.data)
        ? categoryData.data
        : [];

    const productList: unknown[] = Array.isArray(productData)
      ? productData
      : productData &&
          typeof productData === "object" &&
          "data" in productData &&
          Array.isArray(productData.data)
        ? productData.data
        : [];

    const validCategories = categoryList.filter(
      (item): item is Category =>
        typeof item === "object" &&
        item !== null &&
        "slug" in item &&
        "nameBn" in item
    );

    setCategories(validCategories);

    const selectedCategory = validCategories.find(
      (item) => item.slug === slug || item.id === slug
    );

    if (!selectedCategory) {
      throw new Error("এই ক্যাটাগরিটি পাওয়া যায়নি।");
    }

    const validProducts = productList.filter(
      (item): item is Product =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "nameBn" in item &&
        "today" in item
    );

    const categoryProducts = validProducts.filter(
      (product) =>
        product.category === selectedCategory.slug
    );

    setProducts(categoryProducts);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "একটি সমস্যা হয়েছে। আবার চেষ্টা করো।"
    );
  } finally {
    setLoading(false);
  }
}, [slug]);


 useEffect(() => {
  void Promise.resolve().then(() => loadCategory());
}, [loadCategory]);

  const category = categories.find(
    (item) => item.slug === slug || item.id === slug
  );

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      result.sort((a, b) => getPrice(a.today) - getPrice(b.today));
    } else if (sort === "high") {
      result.sort((a, b) => getPrice(b.today) - getPrice(a.today));
    }

    return result;
  }, [products, sort]);

  return (
    <main className="min-h-screen flex-1 bg-[#f0f5f0]">
      <div className="container-bazardor py-8 sm:py-10">
        <Link
          href="/categories"
          className="text-sm font-semibold text-[#078345] hover:underline"
        >
          ← সব ক্যাটাগরি
        </Link>

        <section className="mt-4 rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-6 sm:p-8">
          <span className="text-4xl">{category?.icon || "🛒"}</span>

          <h1 className="mt-3 text-2xl font-extrabold text-[#202820] sm:text-3xl">
            {category?.nameBn || "ক্যাটাগরি পণ্য"}
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            এই ক্যাটাগরির পণ্যের বর্তমান বাজারদর দেখো এবং তুলনা করো।
          </p>
        </section>

        <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="text-lg font-extrabold text-[#202820]">
            পণ্যের তালিকা
            {!loading && ` (${formatNumber(sortedProducts.length)})`}
          </h2>

          <label className="flex items-center gap-3 rounded-xl border border-[#dfe8df] bg-[#fbfcfa] px-3 py-2 text-sm">
            <span className="shrink-0 text-gray-600">দাম অনুযায়ী</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="min-w-0 bg-transparent font-semibold text-[#202820] outline-none"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">কম থেকে বেশি</option>
              <option value="high">বেশি থেকে কম</option>
            </select>
          </label>
        </div>

        {loading && (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-2xl border border-[#dfe8df] bg-[#fbfcfa]"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
          >
            <p className="font-bold">তথ্য লোড করা যায়নি</p>
            <p className="mt-1">{error}</p>
            <button
              type="button"
              onClick={() => void loadCategory()}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
            >
              <RefreshCw className="h-4 w-4" />
              আবার চেষ্টা করো
            </button>
          </div>
        )}

        {!loading && !error && sortedProducts.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && !error && sortedProducts.length === 0 && (
          <div className="mt-5 rounded-2xl border border-dashed border-[#cbd8cb] bg-[#fbfcfa] px-4 py-10 text-center">
            <p className="text-3xl">🛒</p>
            <h2 className="mt-3 font-bold text-[#202820]">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}


export default function CategoryProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f0f5f0] p-8">
          <p className="text-center text-gray-600">
            ক্যাটাগরির তথ্য লোড হচ্ছে...
          </p>
        </main>
      }
    >
      <CategoryProductsContent />
    </Suspense>
  );
}
