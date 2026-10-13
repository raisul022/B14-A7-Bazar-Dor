"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, LoaderCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না। আবার পরীক্ষা করো।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (result.error) {
        setError(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("সমস্যা হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignup(provider: "google" | "github") {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        setError(result.error.message || "Social login চালু করা যায়নি।");
        setSocialLoading("");
      }
    } catch {
      setError("Social login চালু করা যায়নি। পরে আবার চেষ্টা করো।");
      setSocialLoading("");
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <header className="mb-7 text-center">
          <h1 className="text-2xl font-extrabold text-[#202820] sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </header>

        <section className="rounded-2xl border border-[#dfe8df] bg-[#fbfcfa] p-6 sm:p-7">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#202820]">
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: রহিম উদ্দিন"
                className="w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#078345] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#202820]">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#078345] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#202820]">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#078345] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-[#202820]">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="আবার লিখুন"
                className="w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#078345] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !!socialLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#078345] px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_0_#a8cbb5] transition hover:bg-[#066d39] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dfe8df]" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-[#dfe8df]" />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignup("google")}
              disabled={loading || !!socialLoading}
              className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe8df] px-2 py-2 text-sm font-semibold text-[#202820] transition hover:bg-emerald-50 disabled:opacity-60"
            >
              <span className="text-base font-bold text-[#4285F4]">G</span>
              {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignup("github")}
              disabled={loading || !!socialLoading}
              className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe8df] px-2 py-2 text-sm font-semibold text-[#202820] transition hover:bg-emerald-50 disabled:opacity-60"
            >
              <span className="text-base font-bold">●</span>
              {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-semibold text-[#078345] hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </section>

        <p className="mt-5 text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-[#078345]">
            <ArrowLeft className="h-4 w-4" />
            হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
}