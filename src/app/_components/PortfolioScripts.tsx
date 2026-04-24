"use client";
import { useEffect } from "react";

export default function PortfolioScripts() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

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
