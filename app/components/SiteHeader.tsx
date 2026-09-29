"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import QuoteModal from "./QuoteModal";
import { IconArrowRight } from "./icons";
import type { SeasonalNavLink } from "../lib/season";
import { SERVICE_AUDIENCES, getCategoriesFor } from "../lib/services-data";

const PAGE_LINKS = [
  { href: "/new-business", label: "New Business" },
  { href: "/cards-and-photos", label: "Cards & Photos" },
  { href: "/#portfolio", label: "Work" },
];

export default function SiteHeader({ seasonalNav }: { seasonalNav: SeasonalNavLink }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the Services dropdown on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  const closeAll = () => {
    setServicesOpen(false);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-paper/80 backdrop-blur-md shadow-[0_1px_0_rgba(32,26,46,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={closeAll} className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-sm font-bold text-white shadow-md shadow-fuchsia-500/30">
            RM
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            Ryan Martin
            <span className="ml-1.5 hidden text-ink-soft font-normal sm:inline">
              Design &amp; Print
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Services
              <svg
                viewBox="0 0 20 20"
                aria-hidden
                className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              >
                <path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full mt-4 w-[34rem] -translate-x-1/2 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-ink/10">
                <div className="grid grid-cols-2 gap-8">
                  {SERVICE_AUDIENCES.map((audience) => (
                    <div key={audience.id}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                        {audience.label}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {getCategoriesFor(audience.id).map((category) => {
                          const Icon = category.icon;
                          return (
                            <li key={category.slug}>
                              <Link
                                href={`/services/${category.slug}`}
                                onClick={closeAll}
                                className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper-tint"
                              >
                                <span
                                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-white ${category.accent}`}
                                >
                                  <Icon className="h-4 w-4" />
                                </span>
                                {category.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link
                  href="/services"
                  onClick={closeAll}
                  className="group mt-5 flex items-center justify-between border-t border-ink/10 pt-4 text-sm font-semibold text-violet-600 hover:text-violet-700"
                >
                  View all services
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>

          {PAGE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={seasonalNav.href}
            className="flex items-center gap-1.5 rounded-full bg-amber-100/70 px-3 py-1 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-100"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {seasonalNav.label}
          </Link>
        </nav>

        <div className="hidden lg:block">
          <QuoteModal triggerClassName="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:scale-105">
            Get a Quote
          </QuoteModal>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-current transition-transform ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-ink/10 bg-paper px-6 py-4 lg:hidden">
          <Link
            href={seasonalNav.href}
            onClick={closeAll}
            className="mb-3 flex items-center gap-2 rounded-lg bg-amber-100/70 px-3 py-2.5 text-sm font-semibold text-amber-800"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Featured: {seasonalNav.label}
          </Link>

          {SERVICE_AUDIENCES.map((audience) => (
            <div key={audience.id} className="mt-3">
              <p className="px-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                {audience.label}
              </p>
              <div className="mt-1 flex flex-col">
                {getCategoriesFor(audience.id).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/services/${category.slug}`}
                    onClick={closeAll}
                    className="rounded-lg px-2 py-2 text-sm font-medium text-ink hover:bg-paper-tint"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-3 flex flex-col border-t border-ink/10 pt-3">
            <Link
              href="/services"
              onClick={closeAll}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper-tint hover:text-ink"
            >
              All services
            </Link>
            {PAGE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAll}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper-tint hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <QuoteModal triggerClassName="mt-3 w-full rounded-full bg-ink px-5 py-2.5 text-center text-sm font-semibold text-paper">
            Get a Quote
          </QuoteModal>
        </nav>
      )}
    </header>
  );
}
