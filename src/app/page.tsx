import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./portfolio.css";
import PortfolioScripts from "./_components/PortfolioScripts";
import CanvasAnimation from "./_components/CanvasAnimation";
import HeroChart from "./_components/HeroChart";
import ThemeToggle from "./_components/ThemeToggle";

export const metadata: Metadata = {
  description:
    "Портфолио Senior Business Analyst с 4+ годами опыта. Финтех, AI/ML, SaaS. Т-Банк, Purrweb. 15+ проектов. Открыт к предложениям.",
};

export default function Home() {
  return (
    <div className="portfolio-page">
      <a href="#hero" className="skip-to-content">Перейти к содержимому</a>

      {/* Scroll progress bar */}
      <div id="scrollBar" className="scroll-progress" />

      {/* Scroll to top */}
      <button id="toTopBtn" className="to-top-btn" aria-label="Наверх">↑</button>

      <Link href="/os" className="fab-os" title="Интерактивное резюме в формате ОС">
        <div className="os-indicator" />
        ЗАПУСТИТЬ ОС
      </Link>

      <nav>
        <div className="nav-logo">
          <div className="os-indicator-red" />
          АК
        </div>
        <ul className="nav-links">
          <li><a href="#about">О себе</a></li>
          <li><a href="#skills">Навыки</a></li>
          <li><a href="#projects">Проекты</a></li>
          <li><a href="#stack">Стек</a></li>
          <li><a href="#contact" className="nav-cta">Написать</a></li>
        </ul>
        <button className="nav-burger" id="navBurger" aria-label="Открыть меню" aria-expanded="false">
          <span /><span /><span />
        </button>
      </nav>
      <div className="mobile-menu" id="mobileMenu">
        <a href="#about" className="mobile-link">О себе</a>
        <a href="#skills" className="mobile-link">Навыки</a>
        <a href="#projects" className="mobile-link">Проекты</a>
        <a href="#stack" className="mobile-link">Стек</a>
        <a href="#contact" className="mobile-link mobile-cta">Написать</a>
      </div>

      <main id="main-content">
      {/* ── HERO ── */}
      <section id="hero">
        <HeroChart />
        <div className="hero-content">
        <div className="hero-chip">
          <div className="chip-dot" />
          Открыт к новым проектам
        </div>
        <h1 className="hero-name reveal visible">
          Артем<br />
          <span className="dim">Козыренко</span>
        </h1>
        <p className="hero-sub reveal d1 visible">
          <strong>Senior Business Analyst с инженерным бэкграундом.</strong> Проектирую AI-продукты,
          финтех-системы и высоконагруженные платформы на стыке бизнеса и архитектуры.
        </p>
        <div className="hero-actions reveal d2 visible">
          <a href="#projects" className="btn btn-primary">Смотреть проекты ↓</a>
          <a href="#contact" className="btn btn-ghost">Написать мне</a>
        </div>
        <div className="hero-stats reveal d3 visible">
          <div className="hstat"><span className="hstat-num">+24%</span><span className="hstat-label">Точность ML-скоринга</span></div>
          <div className="hstat"><span className="hstat-num">↑8×</span><span className="hstat-label">Скорость поиска LLM/RAG</span></div>
          <div className="hstat"><span className="hstat-num">−40%</span><span className="hstat-label">Штрафные риски</span></div>
        </div>
        <p className="hero-os-hint reveal d3 visible">
          Также есть <Link href="/os" className="hero-os-link">интерактивное резюме в формате ОС →</Link>
        </p>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="section-wrap">
          <div className="reveal">
            <div className="section-label">О себе</div>
            <h2 className="section-title">От кода —<br />к системному анализу</h2>
          </div>
          <div className="about-grid">
            <div className="about-body reveal d1">
              <div className="about-avatar-row">
                <Image
                  src="/avatar.jpg"
                  alt="Артем Козыренко"
                  width={72}
                  height={72}
                  className="about-avatar"
                  priority
                />
                <div className="about-avatar-meta">
                  <div className="about-avatar-name">Артем Козыренко</div>
                  <div className="about-avatar-role">Business Analyst · Омск</div>
                </div>
              </div>
              <p>
                <strong>Начинал как Frontend-разработчик</strong> — это даёт редкое преимущество:
                понимаю, как работает система изнутри, и не теряюсь там, где обычному BA нужен
                разработчик рядом.
              </p>
              <p>
                За 4 года вырос до Fullstack-аналитика (BA/SA): проектирую требования, архитектуру
                интеграций и бизнес-процессы в единой связке. Специализация — AI-продукты,
                финтех и высоконагруженные SaaS-платформы.
              </p>
              <p className="about-personal">
                Вне работы — Mazda, Nissan, японские классики и хороший кофе.
              </p>
            </div>
            <div className="timeline-v2 reveal d2">
              <div className="tv-item">
                <div className="tv-dot-col"><div className="tv-dot" /><div className="tv-line" /></div>
                <div><div className="tv-year">2025 — н.в.</div><div className="tv-role">Business Analyst</div><div className="tv-co">Purrweb · Outsourcing & Ventures</div></div>
              </div>
              <div className="tv-item">
                <div className="tv-dot-col"><div className="tv-dot" /><div className="tv-line" /></div>
                <div><div className="tv-year">2025 · контракт</div><div className="tv-role">Business Analyst</div><div className="tv-co">Т-Банк · Fintech Ecosystem</div></div>
              </div>
              <div className="tv-item">
                <div className="tv-dot-col"><div className="tv-dot" /><div className="tv-line" /></div>
                <div><div className="tv-year">2024 — 2025</div><div className="tv-role">Fullstack Analyst (BA/SA)</div><div className="tv-co">Light4U · Automation & SaaS</div></div>
              </div>
              <div className="tv-item">
                <div className="tv-dot-col"><div className="tv-dot" /><div className="tv-line" /></div>
                <div><div className="tv-year">2023 — 2024</div><div className="tv-role">Business Analyst</div><div className="tv-co">Light4U · Digital Solutions</div></div>
              </div>
              <div className="tv-item">
                <div className="tv-dot-col"><div className="tv-dot" /></div>
                <div><div className="tv-year">2021 — 2025</div><div className="tv-role">Информационные системы и программирование</div><div className="tv-co">ОмГУ им. Достоевского</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="section-wrap">
          <div className="reveal">
            <div className="section-label">Компетенции</div>
            <h2 className="section-title">Что я умею</h2>
            <p className="section-desc">Широкий стек от сбора требований до проектирования интеграций и аналитики данных.</p>
          </div>
          <div className="skills-grid">
            <div className="skill-card reveal d1">
              <div className="sc-icon">📋</div>
              <div className="sc-title">Требования</div>
              <div className="sc-desc">Сбор, анализ и документирование бизнес и системных требований.</div>
              <div className="sc-tags"><span className="sc-tag hot">BABOK</span><span className="sc-tag">User Story</span><span className="sc-tag">Use Case</span><span className="sc-tag">BDD</span></div>
            </div>
            <div className="skill-card reveal d2">
              <div className="sc-icon">🔀</div>
              <div className="sc-title">Моделирование</div>
              <div className="sc-desc">Проектирование бизнес-процессов и архитектурных решений.</div>
              <div className="sc-tags"><span className="sc-tag hot">BPMN 2.0</span><span className="sc-tag">UML</span><span className="sc-tag">ArchiMate</span><span className="sc-tag">TOGAF</span></div>
            </div>
            <div className="skill-card reveal d3">
              <div className="sc-icon">📊</div>
              <div className="sc-title">Данные</div>
              <div className="sc-desc">Работа с данными: аналитика, визуализация, управление качеством.</div>
              <div className="sc-tags"><span className="sc-tag hot">SQL</span><span className="sc-tag">Python</span><span className="sc-tag">Power BI</span><span className="sc-tag">dbt</span></div>
            </div>
            <div className="skill-card reveal d1">
              <div className="sc-icon">🔌</div>
              <div className="sc-title">Интеграции</div>
              <div className="sc-desc">Проектирование межсистемного взаимодействия и API.</div>
              <div className="sc-tags"><span className="sc-tag hot">REST / OpenAPI</span><span className="sc-tag">Kafka</span><span className="sc-tag">gRPC</span></div>
            </div>
            <div className="skill-card reveal d2">
              <div className="sc-icon">🚀</div>
              <div className="sc-title">Методологии</div>
              <div className="sc-desc">Управление проектами и процессами разработки продуктов.</div>
              <div className="sc-tags"><span className="sc-tag hot">Agile / SAFe</span><span className="sc-tag">Scrum</span><span className="sc-tag">Design Sprint</span><span className="sc-tag">DDD</span></div>
            </div>
            <div className="skill-card reveal d3">
              <div className="sc-icon">🛠</div>
              <div className="sc-title">Инструменты</div>
              <div className="sc-desc">Ежедневный рабочий стек для документирования и совместной работы.</div>
              <div className="sc-tags"><span className="sc-tag hot">Confluence</span><span className="sc-tag">Jira</span><span className="sc-tag">Miro</span><span className="sc-tag">Figma</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="section-wrap">
          <div className="reveal">
            <div className="section-label">Кейсы</div>
            <h2 className="section-title">Избранные проекты</h2>
            <p className="section-desc">Четыре кейса с измеримыми результатами.</p>
          </div>
          <div className="projects-list">
            <div className="proj-row reveal d1">
              <div className="pr-left">
                <div className="pr-domain">Fintech · Tier-1 Enterprise</div>
                <div className="pr-title">AI-инфраструктура кредитного скоринга</div>
                <div className="pr-desc">Точность скоринга выросла с 71% до 95% — за счёт внедрения ML-моделей в банковский кредитный конвейер. Спроектировал полную цепочку: от заявки до выдачи без операциониста. BPMN-модели, интеграция с БКИ и Kafka.</div>
                <div className="pr-chips"><span className="pr-chip">MLOps</span><span className="pr-chip">System Design</span><span className="pr-chip">BPMN</span><span className="pr-chip">Kafka</span></div>
              </div>
              <div className="pr-right"><div className="pr-metric-big">+24%</div><div className="pr-metric-label">Точность прогнозов</div><div className="pr-arrow">↗</div></div>
            </div>
            <div className="proj-row reveal d2">
              <div className="pr-left">
                <div className="pr-domain">AI & Security</div>
                <div className="pr-title">Private LLM сервис с RAG-архитектурой</div>
                <div className="pr-desc">Поиск по базе в 100K+ документов ускорился в 8 раз после замены полнотекстового поиска на векторный RAG. Инфраструктура изолирована: zero-trust периметр, данные не покидают корпоративный контур.</div>
                <div className="pr-chips"><span className="pr-chip">LLM</span><span className="pr-chip">RAG</span><span className="pr-chip">REST API</span><span className="pr-chip">OpenAPI</span></div>
              </div>
              <div className="pr-right"><div className="pr-metric-big">↑8×</div><div className="pr-metric-label">Скорость поиска</div><div className="pr-arrow">↗</div></div>
            </div>
            <div className="proj-row reveal d3">
              <div className="pr-left">
                <div className="pr-domain">HealthCare · SaaS</div>
                <div className="pr-title">CRM/ERP для сети стоматологий</div>
                <div className="pr-desc">SaaS-платформа запущена на 350+ клиниках одновременно — полный цикл от Discovery до продакшена. Электронные карты пациентов, складской учёт, зарплатный расчёт, интеграция с ЕГИСЗ.</div>
                <div className="pr-chips"><span className="pr-chip">ERP</span><span className="pr-chip">CRM</span><span className="pr-chip">SQL</span><span className="pr-chip">Confluence</span></div>
              </div>
              <div className="pr-right"><div className="pr-metric-big">350+</div><div className="pr-metric-label">Клиник на платформе</div><div className="pr-arrow">↗</div></div>
            </div>
            <div className="proj-row reveal d1">
              <div className="pr-left">
                <div className="pr-domain">LegalTech · Hybrid</div>
                <div className="pr-title">Hybrid Compliance System</div>
                <div className="pr-desc">Штрафные риски снижены на 40% по 50+ объектам — за счёт автоматизации комплаенс-мониторинга. IoT-датчики, автоматическая отчётность и BPMN-процессы заменили ручные проверки.</div>
                <div className="pr-chips"><span className="pr-chip">IoT</span><span className="pr-chip">Kafka</span><span className="pr-chip">BPMN</span><span className="pr-chip">Python</span></div>
              </div>
              <div className="pr-right"><div className="pr-metric-big">−40%</div><div className="pr-metric-label">Штрафные риски</div><div className="pr-arrow">↗</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section id="stack">
        <div className="section-wrap">
          <div className="reveal">
            <div className="section-label">Инструменты</div>
            <h2 className="section-title">Технический стек</h2>
          </div>
          <div className="stack-grid">
            <div className="stack-group reveal d1">
              <div className="sg-title">Анализ</div>
              <div className="sg-items">
                <div className="sg-item primary"><div className="dot" />BABOK / IIBA</div>
                <div className="sg-item primary"><div className="dot" />BPMN 2.0</div>
                <div className="sg-item"><div className="dot" />UML</div>
                <div className="sg-item"><div className="dot" />ArchiMate</div>
                <div className="sg-item"><div className="dot" />TOGAF 9.2</div>
              </div>
            </div>
            <div className="stack-group reveal d2">
              <div className="sg-title">Данные</div>
              <div className="sg-items">
                <div className="sg-item primary"><div className="dot" />SQL</div>
                <div className="sg-item primary"><div className="dot" />Python</div>
                <div className="sg-item"><div className="dot" />Power BI</div>
                <div className="sg-item"><div className="dot" />Tableau</div>
                <div className="sg-item"><div className="dot" />dbt</div>
              </div>
            </div>
            <div className="stack-group reveal d3">
              <div className="sg-title">Интеграции</div>
              <div className="sg-items">
                <div className="sg-item primary"><div className="dot" />REST / OpenAPI</div>
                <div className="sg-item primary"><div className="dot" />Kafka</div>
                <div className="sg-item"><div className="dot" />gRPC</div>
                <div className="sg-item"><div className="dot" />SOAP / XML</div>
                <div className="sg-item"><div className="dot" />GraphQL</div>
              </div>
            </div>
            <div className="stack-group reveal d1">
              <div className="sg-title">Инструменты</div>
              <div className="sg-items">
                <div className="sg-item primary"><div className="dot" />Confluence</div>
                <div className="sg-item primary"><div className="dot" />Jira</div>
                <div className="sg-item"><div className="dot" />Miro</div>
                <div className="sg-item"><div className="dot" />Figma</div>
                <div className="sg-item"><div className="dot" />Camunda</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">

        <CanvasAnimation />
        <PortfolioScripts />


        <div className="section-wrap">
          <div className="reveal">
            <div className="avail-pill"><div className="ap-dot" />Открыт к предложениям</div>
            <div className="section-label">Контакт</div>
            <h2 className="section-title">Давайте&nbsp;поговорим</h2>
            <p className="section-desc">Ищу сложные проекты на стыке аналитики и системного проектирования: финтех, AI/ML, высоконагруженные платформы. Контракт или штат — рассматриваю оба формата. Отвечаю в течение 24 часов.</p>
          </div>
          <div className="contact-grid">
            <a className="contact-card reveal d1" id="copyEmail" href="mailto:arti.k.renko@gmail.com">
              <div className="cc-icon" aria-hidden="true">✉️</div>
              <div>
                <div className="cc-label">Email</div>
                <div className="cc-val" id="emailText">arti.k.renko@gmail.com</div>
              </div>
              <div className="cc-arrow">→</div>
            </a>
            <a className="contact-card reveal d1" href="/pdf.pdf" download="Resume_Artem_Kozyrenko.pdf">
              <div className="cc-icon" aria-hidden="true">🧾</div>
              <div><div className="cc-label">Резюме</div><div className="cc-val">Скачать PDF</div></div>
              <div className="cc-arrow">↓</div>
            </a>
            <a className="contact-card reveal d2" href="https://t.me/SleepyCoffeeT" target="_blank" rel="noopener noreferrer">
              <div className="cc-icon" aria-hidden="true">✈️</div>
              <div><div className="cc-label">Telegram</div><div className="cc-val">@SleepyCoffeeT</div></div>
              <div className="cc-arrow">→</div>
            </a>
            <a className="contact-card reveal d3" href="https://t.me/sleepycoffeem" target="_blank" rel="noopener noreferrer">
              <div className="cc-icon" aria-hidden="true">✈️</div>
              <div><div className="cc-label">Telegram Канал</div><div className="cc-val">Заметки BA/SA · @sleepycoffeem</div></div>
              <div className="cc-arrow">→</div>
            </a>
            <a className="contact-card reveal d1" href="https://www.linkedin.com/in/kozyrenko" target="_blank" rel="noopener noreferrer">
              <div className="cc-icon" aria-hidden="true">💼</div>
              <div><div className="cc-label">LinkedIn</div><div className="cc-val">linkedin.com/in/kozyrenko</div></div>
              <div className="cc-arrow">→</div>
            </a>
          </div>
        </div>
      </section>

      </main>
      <footer>
        <div className="footer-left">© 2026 · Артем Козыренко</div>
        <div className="footer-right">Business Analyst · Omsk</div>
      </footer>

    </div>
  );
}
