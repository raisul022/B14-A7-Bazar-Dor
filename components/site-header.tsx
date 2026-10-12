
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBasket,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const categories = [
  { name: "চাল", emoji: "🍚", href: "/categories/chal" },
  { name: "ডাল", emoji: "🫘", href: "/categories/dal" },
  { name: "তেল", emoji: "🛢️", href: "/categories/tel" },
  { name: "সবজি", emoji: "🥬", href: "/categories/sobji" },
  { name: "মাছ", emoji: "🐟", href: "/categories/mach" },
  { name: "মাংস", emoji: "🍗", href: "/categories/mangsho" },
  { name: "চিংড়ি-মুরগি", emoji: "🥛", href: "/categories/dim-dui" },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("চাল");

  return (
    <header className="relative z-30 border-b border-[#dfe8df] bg-[#fbfcfa]">
      {/* Main header */}
      <div className="border-b border-[#edf1eb]">
        <div className="container-bazardor flex h-[68px] items-center justify-between gap-4">
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

          <div className="hidden items-center gap-2 text-sm text-gray-600 sm:flex">
            <span className="text-lg" aria-hidden="true">👤</span>
            <span>ব্যবহারকারী</span>
            <ChevronDown className="h-4 w-4" />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Category navigation */}
      <nav aria-label="পণ্যের ক্যাটাগরি" className="hidden md:block">
        <div className="container-bazardor flex min-h-12 items-center gap-1 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              onClick={() => setActiveCategory(category.name)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm transition ${
                activeCategory === category.name
                  ? "bg-[#078345] font-semibold text-white"
                  : "text-gray-700 hover:bg-emerald-50 hover:text-[#078345]"
              }`}
            >
              <span aria-hidden="true">{category.emoji}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          aria-label="মোবাইল ক্যাটাগরি"
          className="border-t border-gray-100 bg-white px-4 py-3 md:hidden"
        >
          <div className="container-bazardor grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                onClick={() => {
                  setActiveCategory(category.name);
                  setMenuOpen(false);
                }}
                className="rounded-lg border border-gray-100 px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50"
              >
                {category.emoji} {category.name}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Market ticker: demo values until API integration */}
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


