"use client";
import { useEffect } from "react";

export default function PortfolioScripts() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

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

    return () => obs.disconnect();
  }, []);

  return null;
}
