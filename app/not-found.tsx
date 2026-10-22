import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex-1 bg-[#f0f5f0]">
      <div className="container-bazardor flex flex-col items-center justify-center py-20 text-center sm:py-28">
        <p className="text-7xl">🔍</p>

        <h1 className="mt-6 text-5xl font-extrabold text-[#202820]">৪০৪</h1>

        <h2 className="mt-3 text-xl font-bold text-[#202820] sm:text-2xl">
          পেজটি পাওয়া যায়নি
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
          তুমি যে পেজটি খুঁজছো সেটি হয়তো সরিয়ে ফেলা হয়েছে, নাম বদল হয়েছে,
          অথবা সাময়িকভাবে পাওয়া যাচ্ছে না।
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-[#078345] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066b38]"
          >
            হোম পেজে ফিরে যান
          </Link>
          <Link
            href="/categories"
            className="rounded-lg border border-[#078345] px-5 py-2.5 text-sm font-semibold text-[#078345] transition hover:bg-emerald-50"
          >
            ক্যাটাগরি দেখুন
          </Link>
        </div>
      </div>
    </main>
  );
}