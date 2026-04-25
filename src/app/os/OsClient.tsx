"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import "./os.css";
import { ARTIFACTS, FOLDERS } from "./artifacts";

interface WinState {
  minimized: boolean;
  zIndex: number;
  maxed: boolean;
  pos: { left: number; top: number; width: number; height?: number };
  prevPos?: { left: number; top: number; width: number; height?: number };
}

const DEFAULTS: Record<string, WinState> = {
  profile:   { minimized: false, zIndex: 22, maxed: false, pos: { left: 60,  top: 52,  width: 420 } },
  skills:    { minimized: false, zIndex: 21, maxed: false, pos: { left: 500, top: 52,  width: 360 } },
  projects:  { minimized: false, zIndex: 20, maxed: false, pos: { left: 60,  top: 450, width: 520, height: 380 } },
  contact:   { minimized: false, zIndex: 19, maxed: false, pos: { left: 560, top: 430, width: 340 } },
  artifacts: { minimized: true,  zIndex: 18, maxed: false, pos: { left: 120, top: 60,  width: 680, height: 500 } },
  blog:      { minimized: true,  zIndex: 17, maxed: false, pos: { left: 200, top: 80,  width: 460, height: 520 } },
};

const BOOT_LABELS = ["KERNEL LOADED", "PROFILE DATABASE", "SKILL INDEX", "PROJECT ARCHIVE", "INTERFACE READY"];

const PROJECTS = [
  { title: "АИ продукты для финтеха", domain: "Fintech", desc: "Автоматизация скоринга и оценки LTV корпоратов. Внедрение ML-моделей в банковский контур.", metrics: [["Точность", "+24%"], ["Decision time", "−40%"]] },
  { title: "Private LLM сервис", domain: "AI & Security", desc: "Изолированная LLM-инфраструктура с RAG-архитектурой. Защита данных и поиск по базе знаний 100K+.", metrics: [["Data Privacy", "100%"], ["Search speed", "↑8×"]] },
  { title: "Hybrid Compliance System", domain: "LegalTech", desc: "Программно-аппаратный комплекс мониторинга. Интеграция IoT-датчиков и автоматизация отчётности.", metrics: [["Штрафы", "−40%"], ["Объектов", "50+"]] },
  { title: "Анонимизатор мед-данных", domain: "MedTech", desc: "NLP-сервис обезличивания ПДн в документах. Соответствие ФЗ-152 и международным стандартам.", metrics: [["Утечки", "0"], ["Accuracy", "99.8%"]] },
  { title: "SaaS для горнолыжек и отелей", domain: "HoReCa", desc: "ERP-система: ски-пасс, бронирование, прокат. Логика динамического ценообразования.", metrics: [["RevPAR", "+18%"], ["Users", "10K+"]] },
  { title: "Оптимизация SQL/Python дашбордов", domain: "Analytics", desc: "Рефакторинг системы отчётности. Оптимизация тяжёлых запросов и перенос расчётов на бэкенд.", metrics: [["Скорость", "↑12×"], ["Query cost", "−30%"]] },
  { title: "SaaS для стоматологий", domain: "HealthCare", desc: "CRM/ERP: электронные карты, складской учёт, расчёт зарплат и графиков врачей.", metrics: [["Клиник", "350+"], ["Retention", "+25%"]] },
  { title: "Мессенджер для бизнеса", domain: "Communication", desc: "Защищённая платформа с AD-интеграцией, ветками обсуждений и E2E шифрованием.", metrics: [["DAU", "150K"], ["SLA", "99.9%"]] },
  { title: "Микросервисный паттерн заводов", domain: "E-com", desc: "ETL-система сбора данных и синхронизации остатков с маркетплейсами в реальном времени.", metrics: [["SKU", "1M+"], ["Frequency", "15m"]] },
  { title: "Обновление товарной сетки", domain: "Retail", desc: "Автоматизация маппинга товаров между магазином и витринами маркетплейсов.", metrics: [["Error rate", "−90%"], ["Time-to-market", "−50%"]] },
  { title: "Сервис АИ озвучки", domain: "Media", desc: "TTS/STT интеграция для автоматического дубляжа видеоконтента. Фонетическая коррекция.", metrics: [["Voice cost", "−75%"], ["Languages", "12"]] },
  { title: "Fantasy Football Platform", domain: "SportTech", desc: "Математическая модель подсчёта очков на основе Live-статистики. Геймификация и лидерборды.", metrics: [["MAU", "50K+"], ["Avg session", "14m"]] },
  { title: "PDF Агрегатор", domain: "SaaS", desc: "Обработка и конвертация документов. Монетизация через Stripe и аналитика поведения.", metrics: [["MRR", "$15K"], ["LTV", "$120"]] },
  { title: "Сервис для арт-пространств", domain: "Events", desc: "Система бронирования залов, продажи билетов и CRM для управления ивентами.", metrics: [["Load", "+30%"], ["Booking time", "−60%"]] },
  { title: "TG-бот регистрации на ивенты", domain: "Bots", desc: "Автоматизация сбора заявок, напоминаний и опросов после мероприятий в Telegram.", metrics: [["Users", "10K"], ["Conversion", "85%"]] },
];

const SKILLS = [
  { cat: "// Анализ и проектирование", skills: [["Бизнес-анализ (BA)", 95], ["Системный анализ (SA)", 90], ["BPMN 2.0 / UML", 92], ["User Story / Use Case", 88]] },
  { cat: "// Технический стек",        skills: [["REST / API Design", 89], ["SQL (PostgreSQL / Oracle)", 85], ["Python / Data Analysis", 75], ["Kafka / Microservices", 70]] },
  { cat: "// Доменная экспертиза",     skills: [["Fintech / Banking", 94], ["AI & LLM Integration", 82], ["E-commerce / SaaS", 87]] },
  { cat: "// Инструменты",             skills: [["Jira / Confluence", 95], ["Figma / UI/UX Design", 80]] },
];

const CAREER = [
  ["2025 — н.в.", "Business Analyst", "Purrweb // Outsourcing & Ventures"],
  ["2025", "Business Analyst", "Т-Банк // Fintech Ecosystem"],
  ["2024 — 2025", "Fullstack Analyst (BA/SA)", "Light4U // Automation & SaaS"],
  ["2023 — 2024", "Business Analyst", "Light4U // Digital Solutions"],
  ["2021 — 2025", "Информационные системы и программирование", "ОмГУ им. Достоевского"],
];

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
  const [finderSelected, setFinderSelected] = useState<string | null>(null);
  const [finderPreview, setFinderPreview] = useState<string | null>(null);
  const [finderFolder, setFinderFolder] = useState<string | null>(null);
  const [desktopIconPos, setDesktopIconPos] = useState({ left: 20, top: 56 });
  const [blogIconPos, setBlogIconPos] = useState({ left: 20, top: 150 });
  const [blogPosts, setBlogPosts] = useState<{ id: string; text: string; date: string; url: string; views?: string }[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogLoaded, setBlogLoaded] = useState(false);
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

  // Mobile: on small screens maximize profile window, minimize others
  useEffect(() => {
    const vw = window.innerWidth;
    if (vw < 768) {
      setWins(prev => ({
        ...prev,
        profile:  { ...prev.profile, maxed: true, pos: { left: 0, top: 32, width: vw } },
        skills:   { ...prev.skills,   minimized: true },
        projects: { ...prev.projects, minimized: true },
        contact:  { ...prev.contact,  minimized: true },
      }));
    }
  }, []);

  // Canvas animation — paused when tab is hidden
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
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      if (document.hidden) { rafRef.current = requestAnimationFrame(draw); return; }
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
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", handleResize); clearTimeout(resizeTimer); };
  }, []);

  // Blog fetch — runs once when blog window first opens
  const fetchBlog = useCallback(() => {
    setBlogLoading(true);
    fetch("/api/tg-feed")
      .then((r) => r.json())
      .then((d) => { setBlogPosts(d.posts ?? []); setBlogLoading(false); setBlogLoaded(true); })
      .catch(() => { setBlogLoading(false); setBlogLoaded(true); });
  }, []);

  useEffect(() => {
    if (!wins.blog?.minimized && !blogLoaded) fetchBlog();
  }, [wins.blog?.minimized, blogLoaded, fetchBlog]);

  // Drag — Pointer Events API (mouse, touch, stylus unified)
  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!drag) return;
    if (drag.id === "desktop-icon") {
      setDesktopIconPos({ left: drag.sl + (e.clientX - drag.sx), top: drag.st + (e.clientY - drag.sy) });
      return;
    }
    setWins((prev) => ({
      ...prev,
      [drag.id]: { ...prev[drag.id], pos: { ...prev[drag.id].pos, left: drag.sl + (e.clientX - drag.sx), top: drag.st + (e.clientY - drag.sy) } },
    }));
  }, [drag]);

  const onPointerUp = useCallback(() => setDrag(null), []);

  useEffect(() => {
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    return () => { document.removeEventListener("pointermove", onPointerMove); document.removeEventListener("pointerup", onPointerUp); };
  }, [onPointerMove, onPointerUp]);

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

  const onTitlebarDown = (e: React.PointerEvent, id: string) => {
    if ((e.target as HTMLElement).closest(".win-btn")) return;
    focusWin(id);
    setDrag({ id, sx: e.clientX, sy: e.clientY, sl: wins[id].pos.left, st: wins[id].pos.top });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const switchTab = (winKey: string, tabKey: string) => setTabs((p) => ({ ...p, [winKey]: tabKey }));

  const winStyle = (id: string): React.CSSProperties => {
    const w = wins[id];
    if (w.maxed) return { left: 0, top: 32, width: "100%", height: "calc(100vh - 32px)", borderRadius: 0, zIndex: w.zIndex };
    const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
    return {
      left: Math.max(0, Math.min(w.pos.left, vw - 280)),
      top: w.pos.top,
      width: Math.min(w.pos.width, vw - 20),
      ...(w.pos.height ? { height: w.pos.height } : {}),
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
              {i < bootStep ? <span style={{ color: "#008c37" }}>[&nbsp;✓&nbsp;]</span> : "[   ]"} {label}
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
            <div className="mb-clock">{clock}</div>
          </div>
        </div>

        {/* ── DESKTOP FOLDER ICON ── */}
        <div
          className="desktop-icon"
          style={{ left: desktopIconPos.left, top: desktopIconPos.top }}
          onPointerDown={(e) => {
            setDrag({ id: "desktop-icon", sx: e.clientX, sy: e.clientY, sl: desktopIconPos.left, st: desktopIconPos.top });
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            e.preventDefault();
          }}
          onDoubleClick={() => toggleWin("artifacts")}
        >
          <div className="desktop-folder-icon" />
          <div className="desktop-icon-label">Артефакты</div>
        </div>

        {/* ── PROFILE WINDOW ── */}
        <div
          className={`os-window${focused === "profile" ? " focused" : ""}${wins.profile.minimized ? " minimized" : ""}`}
          style={winStyle("profile")}
          onPointerDown={() => focusWin("profile")}
        >
          <div className="win-titlebar" onPointerDown={(e) => onTitlebarDown(e, "profile")}>
            <div className="win-btns">
              <button className="win-btn close" aria-label="Закрыть" onClick={() => closeWin("profile")} />
              <button className="win-btn min"   aria-label="Свернуть" onClick={() => closeWin("profile")} />
              <button className="win-btn max"   aria-label="Развернуть" onClick={() => toggleMax("profile")} />
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
                  <Image className="avatar-img" src="/avatar.jpg" alt="Артем Козыренко" width={72} height={72} />
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
                <strong>Аналитик с 4 годами опыта</strong> в разработке и проектировании сложных ИТ-систем. Прошёл путь от Frontend-разработчика до Fullstack-аналитика. Специализируюсь на глубокой технической аналитике (SA) и оптимизации бизнес-процессов (BA). Эксперт в проектировании AI-решений, Fintech-продуктов и высоконагруженных SaaS-платформ.
              </div>
              <div className="kv-row"><span className="kv-key">Опыт</span><span className="kv-val">4 года</span></div>
              <div className="kv-row"><span className="kv-key">Проектов</span><span className="kv-val">15+ успешно закрытых</span></div>
              <div className="kv-row"><span className="kv-key">Домены</span><span className="kv-val">Fintech · AI/ML · SaaS · MedTech</span></div>
              <div className="kv-row"><span className="kv-key">Статус</span><span className="kv-val green">● Открыт к сложным задачам</span></div>
            </div>
            <div className={`tab-panel wp${tabs.profile === "career" ? " active" : ""}`}>
              {CAREER.map(([year, role, co]) => (
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
          onPointerDown={() => focusWin("skills")}
        >
          <div className="win-titlebar" onPointerDown={(e) => onTitlebarDown(e, "skills")}>
            <div className="win-btns">
              <button className="win-btn close" aria-label="Закрыть" onClick={() => closeWin("skills")} />
              <button className="win-btn min"   aria-label="Свернуть" onClick={() => closeWin("skills")} />
              <button className="win-btn max"   aria-label="Развернуть" onClick={() => toggleMax("skills")} />
            </div>
            <div className="win-title">SKILLS.json</div>
          </div>
          <div className="win-body">
            <div className="wp">
              {SKILLS.map(({ cat, skills }) => (
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
          onPointerDown={() => focusWin("projects")}
        >
          <div className="win-titlebar" onPointerDown={(e) => onTitlebarDown(e, "projects")}>
            <div className="win-btns">
              <button className="win-btn close" aria-label="Закрыть" onClick={() => closeWin("projects")} />
              <button className="win-btn min"   aria-label="Свернуть" onClick={() => closeWin("projects")} />
              <button className="win-btn max"   aria-label="Развернуть" onClick={() => toggleMax("projects")} />
            </div>
            <div className="win-title">PROJECTS</div>
          </div>
          <div className="win-body">
            <div className="wp">
              {PROJECTS.map(({ title, domain, desc, metrics }) => (
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
          onPointerDown={() => focusWin("contact")}
        >
          <div className="win-titlebar" onPointerDown={(e) => onTitlebarDown(e, "contact")}>
            <div className="win-btns">
              <button className="win-btn close" aria-label="Закрыть" onClick={() => closeWin("contact")} />
              <button className="win-btn min"   aria-label="Свернуть" onClick={() => closeWin("contact")} />
              <button className="win-btn max"   aria-label="Развернуть" onClick={() => toggleMax("contact")} />
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
              <a className="contact-item" href="https://linkedin.com/in/kozyrenko" target="_blank" rel="noopener noreferrer">
                <div className="ci-icon">🔗</div>
                <div><div className="ci-label">LinkedIn</div><div className="ci-val">linkedin.com/in/kozyrenko</div></div>
                <div className="ci-arrow">→</div>
              </a>
              <div className="avail-block">
                <div className="avail-dot" />
                <div className="avail-text">SYSTEM ONLINE<br />Открыт к новым проектам</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ARTIFACTS FINDER WINDOW ── */}
        <div
          className={`os-window${focused === "artifacts" ? " focused" : ""}${wins.artifacts.minimized ? " minimized" : ""}`}
          style={winStyle("artifacts")}
          onPointerDown={() => focusWin("artifacts")}
        >
          <div className="win-titlebar" onPointerDown={(e) => onTitlebarDown(e, "artifacts")}>
            <div className="win-btns">
              <button className="win-btn close" aria-label="Закрыть" onClick={() => closeWin("artifacts")} />
              <button className="win-btn min"   aria-label="Свернуть" onClick={() => closeWin("artifacts")} />
              <button className="win-btn max"   aria-label="Развернуть" onClick={() => toggleMax("artifacts")} />
            </div>
            <div className="win-title">АРТЕФАКТЫ — Finder</div>
          </div>
          <div className="finder-body">
            {/* Sidebar */}
            <div className="finder-sidebar">
              <div className="finder-sidebar-section">Избранное</div>
              <div
                className={`finder-sidebar-item${finderFolder === null ? " active" : ""}`}
                onClick={() => { setFinderFolder(null); setFinderPreview(null); }}
              >
                <span className="finder-sidebar-icon">◈</span>
                <span className="finder-sidebar-itemlabel">Все файлы</span>
                <span className="finder-sidebar-count">{ARTIFACTS.length}</span>
              </div>
              {FOLDERS.map((f) => {
                const cnt = ARTIFACTS.filter((a) => a.folder === f.name).length;
                if (cnt === 0) return null;
                return (
                  <div
                    key={f.name}
                    className={`finder-sidebar-item${finderFolder === f.name ? " active" : ""}`}
                    onClick={() => { setFinderFolder(f.name); setFinderPreview(null); }}
                  >
                    <span className="finder-sidebar-icon">▤</span>
                    <span className="finder-sidebar-itemlabel">{f.name}</span>
                    <span className="finder-sidebar-count">{cnt}</span>
                  </div>
                );
              })}
              <div className="finder-sidebar-footer">
                {ARTIFACTS.length} артефактов
              </div>
            </div>
            {/* Main */}
            <div className="finder-main">
              {/* Path bar */}
              <div className="finder-pathbar">
                <span className="finder-path-seg">Артефакты</span>
                {finderFolder && <><span className="finder-path-sep">›</span><span className="finder-path-seg active">{finderFolder}</span></>}
                {finderPreview && <><span className="finder-path-sep">›</span><span className="finder-path-seg active">{finderPreview}</span></>}
              </div>
              {finderPreview ? (
                <div className="finder-preview">
                  <div className="finder-preview-toolbar">
                    <button className="finder-back-btn" onClick={() => setFinderPreview(null)}>← Назад</button>
                    <span className="finder-preview-name">{finderPreview}</span>
                    {(() => {
                      const art = ARTIFACTS.find((a) => a.name === finderPreview);
                      const href = art
                        ? `/artifacts/${encodeURIComponent(art.folder)}/${encodeURIComponent(finderPreview)}`
                        : `/artifacts/${encodeURIComponent(finderPreview)}`;
                      return (
                        <a className="finder-download-btn" href={href} download={finderPreview}>↓ Скачать</a>
                      );
                    })()}
                  </div>
                  <div className="finder-preview-content">
                    {(() => {
                      const art = ARTIFACTS.find((a) => a.name === finderPreview);
                      const type = art?.type ?? "pdf";
                      const src = art
                        ? `/artifacts/${encodeURIComponent(art.folder)}/${encodeURIComponent(finderPreview)}`
                        : `/artifacts/${encodeURIComponent(finderPreview)}`;
                      if (["png", "jpg", "jpeg"].includes(type)) {
                        return <img src={src} alt={finderPreview} className="finder-img-preview" />;
                      }
                      if (type === "pdf" || type === "html") {
                        return <iframe src={src} className="finder-iframe" title={finderPreview} sandbox="allow-scripts allow-same-origin" />;
                      }
                      return (
                        <div className="finder-preview-unsupported">
                          <div className="finder-file-icon-lg" data-type={type} />
                          <div className="finder-preview-filename">{finderPreview}</div>
                          <a href={src} download={finderPreview} className="finder-download-btn-lg">↓ Скачать файл</a>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ) : (
                <div className="finder-grid">
                  {(() => {
                    const visible = finderFolder
                      ? ARTIFACTS.filter((a) => a.folder === finderFolder)
                      : ARTIFACTS;
                    if (visible.length === 0) {
                      return (
                        <div className="finder-empty">
                          <div className="finder-empty-icon">▤</div>
                          <div>Нет файлов</div>
                          <div className="finder-empty-hint">Добавьте файлы в public/artifacts/{finderFolder ?? ""}/</div>
                        </div>
                      );
                    }
                    return visible.map((art) => (
                      <div
                        key={`${art.folder}/${art.name}`}
                        className={`finder-file${finderSelected === `${art.folder}/${art.name}` ? " selected" : ""}`}
                        onClick={() => setFinderSelected(`${art.folder}/${art.name}`)}
                        onDoubleClick={() => { setFinderSelected(`${art.folder}/${art.name}`); setFinderPreview(art.name); }}
                      >
                        <div className="finder-file-icon" data-type={art.type} />
                        <div className="finder-file-name">{art.name}</div>
                        {art.size && <div className="finder-file-size">{art.size}</div>}
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dock */}
        <div className="os-dock">
          {[
            { id: "profile",   icon: "◈", label: "Profile" },
            { id: "skills",    icon: "◆", label: "Skills" },
            { id: "projects",  icon: "▦", label: "Projects" },
            { id: "contact",   icon: "◎", label: "Contact" },
            { id: "artifacts", icon: "▤", label: "Артефакты" },
          ].map(({ id, icon, label }) => (
            <div
              key={id}
              className={`dock-item${!wins[id].minimized ? " open" : ""}`}
              onClick={() => toggleWin(id)}
            >
              <div className="dock-icon">{icon}</div>
              <div className="dock-label">{label}</div>
              <div className="dock-dot" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
