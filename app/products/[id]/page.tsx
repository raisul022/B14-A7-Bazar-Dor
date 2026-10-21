"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { getUnitBn } from "@/lib/utils";

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

type Market = {
  market?: string;
  division?: string;
  min?: number;
  max?: number;
};

type Product = {
  id: string | number;
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
    dir?: string;
    pct?: number;
  };
  markets?: Market[];
};

function getNumber(value: PriceValue | undefined): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
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

  return null;
}

function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";

  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatChange(value: number | undefined): string {
  return `${formatPrice(Math.abs(value ?? 0))}%`;
}

function getPriceRange(value: PriceValue | undefined) {
  if (value && typeof value === "object") {
    return {
      min: value.min,
      max: value.max,
      average:
        value.avg ??
        value.average ??
        (typeof value.min === "number" &&
        typeof value.max === "number"
          ? (value.min + value.max) / 2
          : undefined),
    };
  }

  const number = getNumber(value);

  return {
    min: number ?? undefined,
    max: number ?? undefined,
    average: number ?? undefined,
  };
}

function PriceSummary({
  label,
  value,
  description,
}: {
  label: string;
  value: number | undefined;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-4 sm:p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-xl font-extrabold text-[#202820] sm:text-2xl">
        {value === undefined ? "—" : `৳${formatPrice(value)}`}
      </p>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
}

function ProductDetailContent() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProduct = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/products/${id}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("পণ্যের তথ্য পাওয়া যায়নি।");
      }

      const result: unknown = await response.json();

      let item: unknown = result;

      if (
        result &&
        typeof result === "object" &&
        "data" in result
      ) {
        item = result.data;
      }

      if (
        !item ||
        typeof item !== "object" ||
        !("id" in item) ||
        !("nameBn" in item) ||
        !("today" in item)
      ) {
        throw new Error("পণ্যের তথ্য সঠিক format-এ পাওয়া যায়নি।");
      }

      setProduct(item as Product);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "একটি সমস্যা হয়েছে। আবার চেষ্টা করো।"
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void Promise.resolve().then(() => loadProduct());
  }, [loadProduct]);

  if (loading) {
    return (
      <main className="min-h-screen flex-1 bg-[#f0f5f0]">
        <div className="container-bazardor py-8">
          <div className="animate-pulse rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-6 sm:p-8">
            <div className="h-5 w-32 rounded bg-gray-200" />
            <div className="mt-5 h-8 w-2/3 rounded bg-gray-200" />
            <div className="mt-4 h-6 w-1/3 rounded bg-gray-100" />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-28 rounded-xl bg-gray-100" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen flex-1 bg-[#f0f5f0]">
        <div className="container-bazardor py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#078345]"
          >
            <ArrowLeft className="h-4 w-4" />
            হোমে ফিরে যাও
          </Link>

          <div
            role="alert"
            className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700"
          >
            <h1 className="font-bold">পণ্যের তথ্য লোড করা যায়নি</h1>
            <p className="mt-2 text-sm">
              {error || "এই পণ্যটি পাওয়া যায়নি।"}
            </p>

            <button
              type="button"
              onClick={() => void loadProduct()}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              <RefreshCw className="h-4 w-4" />
              আবার চেষ্টা করো
            </button>
          </div>
        </div>
      </main>
    );
  }

  const priceRange = getPriceRange(product.today);
  const todayPrice = getNumber(product.today);
  const direction = product.change?.dir ?? "flat";
  const change = product.change?.pct ?? 0;

  const priceHistory = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <main className="min-h-screen flex-1 bg-[#f0f5f0]">
      <div className="container-bazardor py-6 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#078345] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          সব পণ্যে ফিরে যাও
        </Link>

        {/* Product overview */}
        <section className="mt-5 rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-5 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5ef] text-5xl">
              {product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-flex rounded-full bg-[#e6f4e9] px-3 py-1 text-xs font-semibold text-[#078345]">
                {product.categoryNameBn || product.category || "বাজার পণ্য"}
              </span>

              <h1 className="mt-3 text-2xl font-extrabold text-[#202820] sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {getUnitBn(product.unit)}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <p className="text-3xl font-extrabold text-[#176b45]">
                  ৳{formatPrice(todayPrice)}
                </p>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${
                    direction === "up"
                      ? "bg-red-50 text-red-500"
                      : direction === "down"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {direction === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : direction === "down" ? (
                    <ArrowDownRight className="h-4 w-4" />
                  ) : (
                    "—"
                  )}
                  {formatChange(change)}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                আজকের API-প্রদত্ত দাম ও পরিবর্তনের তথ্য
              </p>
            </div>
          </div>
        </section>

        {/* Min, max, average */}
        <section className="mt-7">
          <h2 className="mb-4 text-lg font-extrabold text-[#202820]">
            আজকের দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PriceSummary
              label="সর্বনিম্ন দাম"
              value={priceRange.min}
              description="API-তে দেওয়া সর্বনিম্ন দাম"
            />
            <PriceSummary
              label="সর্বোচ্চ দাম"
              value={priceRange.max}
              description="API-তে দেওয়া সর্বোচ্চ দাম"
            />
            <PriceSummary
              label="গড় দাম"
              value={priceRange.average}
              description="API-তে গড় না থাকলে min/max থেকে হিসাব"
            />
          </div>
        </section>

        {/* Price history */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-extrabold text-[#202820]">
            আগের দামের তথ্য
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {priceHistory.map((history) => (
              <div
                key={history.label}
                className="rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-4"
              >
                <p className="text-sm text-gray-500">{history.label}</p>
                <p className="mt-2 text-xl font-bold text-[#202820]">
                  {getNumber(history.value) === null
                    ? "তথ্য নেই"
                    : `৳${formatPrice(getNumber(history.value))}`}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Market-wise prices */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-lg font-extrabold text-[#202820]">
              বাজারভিত্তিক দাম
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              API-তে থাকা বাজার ও বিভাগ অনুযায়ী দামের তুলনা
            </p>
          </div>

          {product.markets && product.markets.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-[#dfe8df] bg-[#fbfcfa]">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-[#eaf4ec] text-[#202820]">
                  <tr>
                    <th className="px-4 py-3 font-bold">বাজার</th>
                    <th className="px-4 py-3 font-bold">বিভাগ</th>
                    <th className="px-4 py-3 font-bold">সর্বনিম্ন</th>
                    <th className="px-4 py-3 font-bold">সর্বোচ্চ</th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={`${market.market ?? "market"}-${index}`}
                      className="border-t border-[#e6ece5]"
                    >
                      <td className="px-4 py-3 font-semibold text-[#202820]">
                        {market.market || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {market.division || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {market.min === undefined
                          ? "—"
                          : `৳${formatPrice(market.min)}`}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {market.max === undefined
                          ? "—"
                          : `৳${formatPrice(market.max)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#cbd8cb] bg-[#fbfcfa] p-6 text-center text-sm text-gray-500">
              এই পণ্যের জন্য বাজারভিত্তিক দামের তথ্য API-তে নেই।
            </div>
          )}
        </section>

        <div className="mt-8">
          <Link
            href={`/categories/${product.category || ""}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#078345] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b38]"
          >
            একই ক্যাটাগরির পণ্য দেখুন
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f0f5f0] p-8">
          <p className="text-center text-gray-600">
            পণ্যের তথ্য লোড হচ্ছে...
          </p>
        </main>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}