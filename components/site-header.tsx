
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ShoppingBasket,
  Search,
  UserRound,
  ChevronDown,
} from "lucide-react";

const categories = [
  { label: "চাল ও ডাল", href: "/#products" },
  { label: "তেল ও মসলা", href: "/#products" },
  { label: "মাছ ও মাংস", href: "/#products" },
  { label: "শাকসবজি", href: "/#products" },
  { label: "ফলমূল", href: "/#products" },
];

const mainLinks = [
  { label: "হোম", href: "/" },
  { label: "বাজারদর", href: "/#products" },
  { label: "দাম তুলনা", href: "/#price-trends" },
  { label: "আমাদের সম্পর্কে", href: "/#about" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      {/* Main navigation */}
      <div className="container-bazardor">
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            aria-label="বাজার দর হোম"
            className="flex shrink-0 items-center gap-2.5"
            onClick={closeMenu}
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <ShoppingBasket size={25} strokeWidth={2.2} />
            </span>

            <span className="flex flex-col">
              <span className="text-xl font-extrabold leading-tight tracking-tight text-primary sm:text-2xl">
                বাজার দর
              </span>
              <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground sm:text-xs">
                BAZARDOR
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            aria-label="প্রধান নেভিগেশন"
            className="hidden items-center gap-6 lg:flex"
          >
            {mainLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  index === 0 ? "text-primary" : "text-foreground/75"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <Link
              href="/#products"
              aria-label="পণ্য খুঁজুন"
              className="flex size-10 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <Search size={19} />
            </Link>

            <Link
              href="/login"
              className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <UserRound size={17} />
              লগইন
            </Link>

            <Link
              href="/signup"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              নিবন্ধন
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Category navigation */}
      <div className="hidden border-t border-border/70 md:block">
        <div className="container-bazardor flex h-11 items-center justify-between gap-4">
          <Link
            href="/#categories"
            className="flex shrink-0 items-center gap-2 text-sm font-bold text-primary"
          >
            <ShoppingBasket size={17} />
            সব ক্যাটাগরি
            <ChevronDown size={15} />
          </Link>

          <nav
            aria-label="পণ্যের ক্যাটাগরি"
            className="flex items-center gap-6 overflow-x-auto"
          >
            {categories.map((category) => (
              <Link
                key={category.label}
                href={category.href}
                className="shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {category.label}
              </Link>
            ))}
          </nav>

          <span className="hidden shrink-0 text-xs font-medium text-muted-foreground xl:block">
            সঠিক বাজারদর, সহজ সিদ্ধান্ত
          </span>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-white md:hidden"
        >
          <nav
            aria-label="মোবাইল নেভিগেশন"
            className="container-bazardor flex flex-col py-3"
          >
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-border" />

            <p className="px-3 pb-1 pt-2 text-xs font-bold text-muted-foreground">
              পণ্যের ক্যাটাগরি
            </p>

            {categories.map((category) => (
              <Link
                key={category.label}
                href={category.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                {category.label}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold"
              >
                <UserRound size={17} />
                লগইন
              </Link>

              <Link
                href="/signup"
                onClick={closeMenu}
                className="flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
              >
                নিবন্ধন
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
