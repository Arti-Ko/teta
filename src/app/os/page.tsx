"use client";

import type { Metadata } from "next";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import "./os.css";

interface WinState {
  minimized: boolean;
  zIndex: number;
  maxed: boolean;
  pos: { left: number; top: number; width: number; height?: number };
  prevPos?: { left: number; top: number; width: number; height?: number };
}

const DEFAULTS: Record<string, WinState> = {
  profile:  { minimized: false, zIndex: 22, maxed: false, pos: { left: 60,  top: 52,  width: 420 } },
  skills:   { minimized: false, zIndex: 21, maxed: false, pos: { left: 500, top: 52,  width: 360 } },
  projects: { minimized: false, zIndex: 20, maxed: false, pos: { left: 60,  top: 450, width: 480, height: 350 } },
  contact:  { minimized: false, zIndex: 19, maxed: false, pos: { left: 560, top: 430, width: 340 } },
};

const BOOT_LABELS = ["KERNEL LOADED", "PROFILE DATABASE", "SKILL INDEX", "PROJECT ARCHIVE", "INTERFACE READY"];

export default function OsPage() {
  const [wins, setWins] = useState(DEFAULTS);
  const [topZ, setTopZ] = useState(22);
  const [focused, setFocused] = useState("profile");
  const [bootStep, setBootStep] = useState(0);
  const [booted, setBooted] = useState(false);
  const [clock, setClock] = useState("00:00:00");
  const [tabs, setTabs] = useState<Record<string, string>>({ profile: "info" });
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [drag, setDrag] = useState<{ id: string; sx: number; sy: number; sl: number; st: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Clock
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setClock(`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Boot sequence
  useEffect(() => {
    let step = 0;
    const next = () => {
      step++;
      setBootStep(step);
      if (step < BOOT_LABELS.length) setTimeout(next, 280 + Math.random() * 200);
    };
    setTimeout(next, 300);
    setTimeout(() => {
      setBooted(true);
      setTimeout(() => setSkillsAnimated(true), 400);
    }, 2800);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;
    type Dot = { x: number; y: number; phase: number };
    let dots: Dot[] = [];
    let t = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      dots = [];
      const cols = Math.ceil(W / 40), rows = Math.ceil(H / 40);
      for (let i = 0; i <= cols; i++)
        for (let j = 0; j <= rows; j++)
          dots.push({ x: i * 40, y: j * 40, phase: Math.random() * Math.PI * 2 });
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;
      dots.forEach((d) => {
        const pulse = 0.5 + 0.5 * Math.sin(t + d.phase);
        ctx.beginPath();
        ctx.arc(d.x, d.y, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110,120,255,${0.06 + 0.1 * pulse})`;
        ctx.fill();
      });
      const scanY = (t * 60) % H;
      const g = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      g.addColorStop(0, "rgba(110,120,255,0)");
      g.addColorStop(0.5, "rgba(110,120,255,0.03)");
      g.addColorStop(1, "rgba(110,120,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, scanY - 40, W, 80);
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  // Drag mouse events
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!drag) return;
    setWins((prev) => ({
      ...prev,
      [drag.id]: { ...prev[drag.id], pos: { ...prev[drag.id].pos, left: drag.sl + (e.clientX - drag.sx), top: drag.st + (e.clientY - drag.sy) } },
    }));
  }, [drag]);

  const onMouseUp = useCallback(() => setDrag(null), []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => { document.removeEventListener("mousemove", onMouseMove); document.removeEventListener("mouseup", onMouseUp); };
  }, [onMouseMove, onMouseUp]);

  // Window helpers
  const focusWin = (id: string) => {
    const z = topZ + 1;
    setTopZ(z);
    setFocused(id);
    setWins((p) => ({ ...p, [id]: { ...p[id], zIndex: z } }));
  };

  const closeWin = (id: string) => setWins((p) => ({ ...p, [id]: { ...p[id], minimized: true } }));

  const toggleWin = (id: string) => {
    if (wins[id].minimized) { setWins((p) => ({ ...p, [id]: { ...p[id], minimized: false } })); focusWin(id); }
    else focusWin(id);
  };

  const toggleMax = (id: string) => {
    const w = wins[id];
    if (w.maxed) {
      setWins((p) => ({ ...p, [id]: { ...p[id], maxed: false, pos: p[id].prevPos ?? p[id].pos } }));
    } else {
      setWins((p) => ({ ...p, [id]: { ...p[id], maxed: true, prevPos: p[id].pos, pos: { left: 0, top: 32, width: window.innerWidth } } }));
    }
  };

  const onTitlebarDown = (e: React.MouseEvent, id: string) => {
    if ((e.target as HTMLElement).closest(".win-btn")) return;
    focusWin(id);
    setDrag({ id, sx: e.clientX, sy: e.clientY, sl: wins[id].pos.left, st: wins[id].pos.top });
    e.preventDefault();
  };

  const switchTab = (winKey: string, tabKey: string) => setTabs((p) => ({ ...p, [winKey]: tabKey }));

  const winStyle = (id: string): React.CSSProperties => {
    const w = wins[id];
    return {
      left: w.pos.left, top: w.pos.top, width: w.pos.width,
      ...(w.pos.height ? { height: w.pos.height } : {}),
      ...(w.maxed ? { borderRadius: 0 } : {}),
      zIndex: w.zIndex,
    };
  };

  return (
    <div className="os-root">
      <canvas ref={canvasRef} className="os-canvas" />

      {/* Boot */}
      <div className={`os-boot${booted ? " fade-out" : ""}`} style={{ display: booted && bootStep > BOOT_LABELS.length ? "none" : undefined }}>
        <div className="boot-logo">◈ ARTI.OS v-4.04</div>
        <div className="boot-lines">
          {BOOT_LABELS.map((label, i) => (
            <div key={i} className={i < bootStep ? "boot-line-done" : ""}>
              {i < bootStep ? <span style={{ color: "#008c37" }}>[&nbsp;✓&nbsp;]</span> : "[   ]"} {label}
            </div>
          ))}
        </div>
        <div className="boot-bar-wrap">
          <div className="boot-bar-fill" style={{ width: booted ? "100%" : `${(bootStep / BOOT_LABELS.length) * 100}%` }} />
        </div>
        <div className="boot-ver">BUILD 404 // SYSTEM ARTI READY</div>
      </div>

      {/* Desktop */}
      <Link href="/" className="fab-exit">
        <div className="exit-indicator" />
        ВЫЙТИ ИЗ СИСТЕМЫ
      </Link>

      <div className={`os-desktop${booted ? " visible" : ""}`}>
        {/* Menubar */}
        <div className="os-menubar">
          <div className="mb-left">
            <div className="mb-logo">◈ ARTI.OS</div>
            <div className="mb-menu">
              <div className="mb-item">Файл</div>
              <div className="mb-item">Вид</div>
              <div className="mb-item">Инструменты</div>
              <div className="mb-item">Справка</div>
            </div>
          </div>
          <div className="mb-right">
            <div className="mb-stat"><div className="dot" />AVAILABLE</div>
            <div className="mb-stat">CPU 12% · MEM 3.2G</div>
            <div className="mb-clock">{clock}</div>
          </div>
        </div>

        {/* ── PROFILE WINDOW ── */}
        <div
          className={`os-window${focused === "profile" ? " focused" : ""}${wins.profile.minimized ? " minimized" : ""}`}
          style={winStyle("profile")}
          onMouseDown={() => focusWin("profile")}
        >
          <div className="win-titlebar" onMouseDown={(e) => onTitlebarDown(e, "profile")}>
            <div className="win-btns">
              <button className="win-btn close"  onClick={() => closeWin("profile")} />
              <button className="win-btn min"    onClick={() => closeWin("profile")} />
              <button className="win-btn max"    onClick={() => toggleMax("profile")} />
            </div>
            <div className="win-title">PROFILE.db</div>
          </div>
          <div className="win-tabs">
            <div className={`win-tab${tabs.profile === "info" ? " active" : ""}`} onClick={() => switchTab("profile", "info")}>Инфо</div>
            <div className={`win-tab${tabs.profile === "career" ? " active" : ""}`} onClick={() => switchTab("profile", "career")}>Карьера</div>
          </div>
          <div className="win-body">
            <div className={`tab-panel wp${tabs.profile === "info" ? " active" : ""}`}>
              <div className="profile-header">
                <div className="profile-avatar">
                  <img className="avatar-img" src="/avatar.jpg" alt="Артем Козыренко" />
                </div>
                <div>
                  <div className="profile-name">Артем Козыренко</div>
                  <div className="profile-role">Business Analyst</div>
                  <div className="profile-badges">
                    <span className="badge green">Available</span>
                    <span className="badge yellow">OMSK · Remote</span>
                  </div>
                </div>
              </div>
              <div className="profile-bio">
                <strong>Системный аналитик с 6+ годами опыта</strong> в финтехе, ретейле и промышленной автоматизации. Специализируюсь на проектировании требований, моделировании процессов и архитектуре данных.
              </div>
              <div className="kv-row"><span className="kv-key">Опыт</span><span className="kv-val">6+ лет</span></div>
              <div className="kv-row"><span className="kv-key">Проектов</span><span className="kv-val">34 завершённых</span></div>
              <div className="kv-row"><span className="kv-key">Домены</span><span className="kv-val">Fintech · Retail · Enterprise</span></div>
              <div className="kv-row"><span className="kv-key">Сертификаты</span><span className="kv-val">TOGAF 9.2 · BABOK</span></div>
              <div className="kv-row"><span className="kv-key">Статус</span><span className="kv-val green">● Открыт к предложениям</span></div>
            </div>
            <div className={`tab-panel wp${tabs.profile === "career" ? " active" : ""}`}>
              {[
                ["2023—н.в.", "Senior Business Analyst", "SBER // Digital Platforms"],
                ["2021—23", "Business Analyst", "Tinkoff // Fintech Products"],
                ["2019—21", "Systems Analyst", "X5 Group // Retail Tech"],
                ["2017—19", "Junior BA", "Luxoft // Enterprise"],
                ["2013—17", "Прикладная математика", "НИУ ВШЭ"],
              ].map(([year, role, co]) => (
                <div className="tl-item" key={year}>
                  <div className="tl-year">{year}</div>
                  <div><div className="tl-role">{role}</div><div className="tl-co">{co}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SKILLS WINDOW ── */}
        <div
          className={`os-window${focused === "skills" ? " focused" : ""}${wins.skills.minimized ? " minimized" : ""}`}
          style={winStyle("skills")}
          onMouseDown={() => focusWin("skills")}
        >
          <div className="win-titlebar" onMouseDown={(e) => onTitlebarDown(e, "skills")}>
            <div className="win-btns">
              <button className="win-btn close" onClick={() => closeWin("skills")} />
              <button className="win-btn min"   onClick={() => closeWin("skills")} />
              <button className="win-btn max"   onClick={() => toggleMax("skills")} />
            </div>
            <div className="win-title">SKILLS.json</div>
          </div>
          <div className="win-body">
            <div className="wp">
              {[
                { cat: "// Анализ требований", skills: [["BABOK / IIBA", 95], ["User Story / BDD", 92], ["Use Case / UML", 88]] },
                { cat: "// Моделирование",      skills: [["BPMN 2.0", 90], ["ArchiMate", 78]] },
                { cat: "// Данные",             skills: [["SQL", 85], ["Python / Pandas", 72], ["Power BI", 80]] },
                { cat: "// Интеграции",         skills: [["REST / OpenAPI", 87], ["Kafka / gRPC", 68]] },
              ].map(({ cat, skills }) => (
                <div key={cat}>
                  <div className="skill-cat-header">{cat}</div>
                  {skills.map(([name, pct]) => (
                    <div className="skill-row" key={name as string}>
                      <span className="skill-name-s">{name as string}</span>
                      <div className="skill-bar-outer">
                        <div className="skill-bar-inner" style={{ width: skillsAnimated ? `${pct}%` : "0%" }} />
                      </div>
                      <span className="skill-pct">{pct}%</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PROJECTS WINDOW ── */}
        <div
          className={`os-window${focused === "projects" ? " focused" : ""}${wins.projects.minimized ? " minimized" : ""}`}
          style={winStyle("projects")}
          onMouseDown={() => focusWin("projects")}
        >
          <div className="win-titlebar" onMouseDown={(e) => onTitlebarDown(e, "projects")}>
            <div className="win-btns">
              <button className="win-btn close" onClick={() => closeWin("projects")} />
              <button className="win-btn min"   onClick={() => closeWin("projects")} />
              <button className="win-btn max"   onClick={() => toggleMax("projects")} />
            </div>
            <div className="win-title">PROJECTS</div>
          </div>
          <div className="win-body">
            <div className="wp">
              {[
                { title: "Автоматизация кредитного конвейера", domain: "Fintech", desc: "Полный реинжиниринг процесса выдачи кредитов. От заявки до выдачи без участия операциониста.", metrics: [["Time-to-credit", "−68%"], ["Заявок/мес", "3.2M"]] },
                { title: "MDM — единое управление ассортиментом", domain: "Retail", desc: "Проектирование мастер-системы для управления 200K+ SKU. Интеграция 14 систем-источников.", metrics: [["Систем", "14"], ["SKU", "200K+"]] },
                { title: "Data Governance платформа", domain: "Analytics", desc: "Архитектура управления данными банка: каталог, data lineage, политики качества. 40+ доменов.", metrics: [["Доменов", "40+"], ["Data quality", "↑4×"]] },
              ].map(({ title, domain, desc, metrics }) => (
                <div className="project-item" key={title}>
                  <div className="proj-header">
                    <div className="proj-title-os">{title}</div>
                    <div className="proj-domain-os">{domain}</div>
                  </div>
                  <div className="proj-desc-os">{desc}</div>
                  <div className="proj-metrics">
                    {metrics.map(([k, v]) => <span className="proj-metric" key={k}>{k} <span>{v}</span></span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTACT WINDOW ── */}
        <div
          className={`os-window${focused === "contact" ? " focused" : ""}${wins.contact.minimized ? " minimized" : ""}`}
          style={winStyle("contact")}
          onMouseDown={() => focusWin("contact")}
        >
          <div className="win-titlebar" onMouseDown={(e) => onTitlebarDown(e, "contact")}>
            <div className="win-btns">
              <button className="win-btn close" onClick={() => closeWin("contact")} />
              <button className="win-btn min"   onClick={() => closeWin("contact")} />
              <button className="win-btn max"   onClick={() => toggleMax("contact")} />
            </div>
            <div className="win-title">CONTACT.sh</div>
          </div>
          <div className="win-body">
            <div className="wp">
              <div className="contact-item" onClick={() => navigator.clipboard.writeText("arti.k.renko@gmail.com")}>
                <div className="ci-icon">✉️</div>
                <div><div className="ci-label">Email</div><div className="ci-val">arti.k.renko@gmail.com</div></div>
                <div className="ci-arrow">→</div>
              </div>
              <a className="contact-item" href="/pdf.pdf" download="Resume_Artem_Kozyrenko.pdf">
                <div className="ci-icon">↓</div>
                <div><div className="ci-label">Резюме</div><div className="ci-val">Скачать PDF</div></div>
                <div className="ci-arrow">→</div>
              </a>
              <a className="contact-item" href="https://t.me/SleepyCoffeeT" target="_blank" rel="noopener noreferrer">
                <div className="ci-icon">✈️</div>
                <div><div className="ci-label">Telegram</div><div className="ci-val">@SleepyCoffeeT</div></div>
                <div className="ci-arrow">→</div>
              </a>
              <a className="contact-item" href="https://t.me/sleepycoffeem" target="_blank" rel="noopener noreferrer">
                <div className="ci-icon">✈️</div>
                <div><div className="ci-label">Telegram канал</div><div className="ci-val">@sleepycoffeem</div></div>
                <div className="ci-arrow">→</div>
              </a>
              <div className="avail-block">
                <div className="avail-dot" />
                <div className="avail-text">SYSTEM ONLINE<br />Открыт к новым проектам</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dock */}
        <div className="os-dock">
          {(["profile", "skills", "projects", "contact"] as const).map((id) => (
            <div
              key={id}
              className={`dock-item${!wins[id].minimized ? " open" : ""}`}
              onClick={() => toggleWin(id)}
            >
              <div className="dock-icon">{id === "profile" ? "◈" : id === "skills" ? "◆" : id === "projects" ? "▦" : "◎"}</div>
              <div className="dock-label">{id === "profile" ? "Profile" : id === "skills" ? "Skills" : id === "projects" ? "Projects" : "Contact"}</div>
              <div className="dock-dot" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
