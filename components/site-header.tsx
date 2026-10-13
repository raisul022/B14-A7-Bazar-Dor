"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBasket,
  ChevronDown,
  Menu,
  X,
  UserRound,
  LogIn,
  UserPlus,
  LogOut,
  CircleUserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "চাল", emoji: "🍚", href: "/categories/chal" },
  { name: "ডাল", emoji: "🫘", href: "/categories/dal" },
  { name: "তেল", emoji: "🛢️", href: "/categories/tel" },
  { name: "সবজি", emoji: "🥬", href: "/categories/sobji" },
  { name: "মাছ", emoji: "🐟", href: "/categories/mach" },
  { name: "মাংস", emoji: "🍗", href: "/categories/mangsho" },
  { name: "ডিম-দুধ", emoji: "🥛", href: "/categories/dim-dui" },
  { name: "মসলা", emoji: "🌶️", href: "/categories/mosla" },
];

const tickerItems = [
  { name: "স্বর্ণচিনি চাল", price: "১৪৮ টাকা/কেজি", change: "২.৬%", up: true },
  { name: "মিনিকেট চাল", price: "৯৯ টাকা/কেজি", change: "২.৯%", up: false },
  { name: "বাটাম সাইজ চাল", price: "৬৬ টাকা/কেজি", change: "০.৬%", up: true },
  { name: "মসুর ডাল", price: "১৪২ টাকা/কেজি", change: "১.৯%", up: true },
  { name: "ছোলা", price: "১২০ টাকা/কেজি", change: "১.৪%", up: false },
  { name: "আমন ডাল", price: "৮০ টাকা/কেজি", change: "২.০%", up: true },
];

export default function SiteHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function handleLogout() {
    setLoggingOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        console.error("Logout failed:", result.error.message);
        return;
      }

      setAccountMenuOpen(false);
      setMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="relative z-30 border-b border-[#dfe8df] bg-[#fbfcfa]">
      <div className="border-b border-[#edf1eb]">
        <div className="container-bazardor flex min-h-[68px] items-center justify-between gap-3 py-2">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#078345] text-white">
              <ShoppingBasket className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-xl font-extrabold leading-tight text-[#202820]">
                বাজার দর
              </span>
              <span className="mt-0.5 block text-[11px] text-gray-500">
                বাংলাদেশের বাজারদর এক নজরে
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {isPending ? (
              <span className="text-sm text-gray-500">লোড হচ্ছে...</span>
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  aria-expanded={accountMenuOpen}
                  className="flex items-center gap-2 rounded-xl border border-[#dfe8df] bg-white px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                >
                  <UserRound className="h-4 w-4 text-[#078345]" />
                  <span className="max-w-36 truncate font-medium">
                    {user.name || user.email}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[#dfe8df] bg-white p-2 shadow-lg">
                    <div className="border-b border-gray-100 px-3 py-2">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50"
                    >
                      <CircleUserRound className="h-4 w-4" />
                      Profile
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      <LogOut className="h-4 w-4" />
                      {loggingOut ? "Logout হচ্ছে..." : "Logout"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 rounded-lg border border-[#078345] px-4 py-2 text-sm font-semibold text-[#078345] transition hover:bg-emerald-50"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 rounded-lg bg-[#078345] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#066b39]"
                >
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-700 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav aria-label="পণ্যের ক্যাটাগরি" className="hidden md:block">
        <div className="container-bazardor flex min-h-12 items-center gap-1 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm text-gray-700 transition hover:bg-emerald-50 hover:text-[#078345]"
            >
              <span aria-hidden="true">{category.emoji}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <nav
          aria-label="মোবাইল মেনু"
          className="border-t border-gray-100 bg-white px-4 py-3 md:hidden"
        >
          <div className="container-bazardor space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-gray-100 px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50"
                >
                  {category.emoji} {category.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3">
              {isPending ? (
                <p className="py-2 text-sm text-gray-500">লোড হচ্ছে...</p>
              ) : user ? (
                <div className="space-y-2">
                  <div className="px-2 py-1">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="break-all text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50"
                  >
                    <CircleUserRound className="h-4 w-4" />
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
                  >
                    <LogOut className="h-4 w-4" />
                    {loggingOut ? "Logout হচ্ছে..." : "Logout"}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/signin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-[#078345] px-3 py-2.5 text-sm font-semibold text-[#078345]"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-[#078345] px-3 py-2.5 text-sm font-semibold text-white"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}

      <div className="overflow-hidden border-t border-[#e7eee7] bg-white">
        <div className="bazardor-ticker flex w-max items-center">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex h-9 shrink-0 items-center gap-1.5 border-r border-[#edf1eb] px-4 text-xs sm:text-sm"
            >
              <span aria-hidden="true">🪙</span>
              <span className="font-medium text-gray-700">{item.name}</span>
              <span className="text-gray-600">{item.price}</span>
              <span className={item.up ? "font-semibold text-red-500" : "font-semibold text-emerald-600"}>
                {item.up ? "▲" : "▼"} {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}