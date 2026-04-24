"use client";
import { useEffect } from "react";

export default function PortfolioScripts() {
  useEffect(() => {
    // ── Scroll reveal ────────────────────────────────────────────────
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.10 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    // ── Burger menu ──────────────────────────────────────────────────
    const burger = document.getElementById("navBurger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (burger && mobileMenu) {
      const toggle = () => {
        const isOpen = mobileMenu.classList.toggle("open");
        burger.classList.toggle("open", isOpen);
        burger.setAttribute("aria-expanded", String(isOpen));
      };
      burger.addEventListener("click", toggle);
      mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
          burger.classList.remove("open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }

    // ── Copy email ───────────────────────────────────────────────────
    const btn = document.getElementById("copyEmail");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = (document.getElementById("emailText") as HTMLElement)?.innerText;
        if (!email) return;
        navigator.clipboard.writeText(email).then(() => {
          const arrow = btn.querySelector(".cc-arrow") as HTMLElement;
          if (!arrow) return;
          const orig = arrow.innerText;
          arrow.innerText = "СКОПИРОВАНО";
          setTimeout(() => { arrow.innerText = orig; }, 2000);
        });
      });
    }

    // ── Scroll progress bar ──────────────────────────────────────────
    const bar = document.getElementById("scrollBar");
    const updateBar = () => {
      if (!bar) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : "0%";
    };
    window.addEventListener("scroll", updateBar, { passive: true });

    // ── Active nav link (section spy) ────────────────────────────────
    const sections = ["hero", "about", "skills", "projects", "stack", "contact"];
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-links a[href^='#']");

    const activateNav = () => {
      const scrollY = window.scrollY + 120;
      let active = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) active = id;
      }
      navLinks.forEach((a) => {
        const href = a.getAttribute("href");
        a.classList.toggle("nav-active", href === `#${active}`);
      });
    };
    window.addEventListener("scroll", activateNav, { passive: true });
    activateNav();

    // ── Scroll-to-top button ─────────────────────────────────────────
    const toTop = document.getElementById("toTopBtn");
    const updateToTop = () => {
      if (!toTop) return;
      toTop.classList.toggle("visible", window.scrollY > 600);
    };
    window.addEventListener("scroll", updateToTop, { passive: true });
    if (toTop) {
      toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", updateBar);
      window.removeEventListener("scroll", activateNav);
      window.removeEventListener("scroll", updateToTop);
    };
  }, []);

  return null;
}
